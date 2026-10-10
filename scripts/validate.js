import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const skillsDir = path.join(root, "skills");
const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

// Real YAML parsers (used by `npx skills add`) reject these in plain scalars;
// catch them here so a broken frontmatter fails validation instead of the install.
function checkScalar(value, key, file) {
  if (!value) return;
  const quote = value[0];
  if (quote === '"' || quote === "'") {
    if (value.length < 2 || value[value.length - 1] !== quote) {
      fail(`${file}: ${key} has an unterminated ${quote} quote`);
    }
    return;
  }
  if (/^[|>]/.test(value)) return;
  if (/^[\[{&*!%@`]/.test(value)) {
    fail(`${file}: ${key} starts with YAML indicator "${value[0]}"; wrap the value in quotes`);
  }
  if (/:(\s|$)/.test(value)) {
    fail(`${file}: ${key} contains ": " which YAML reads as a nested mapping; wrap the value in quotes or rephrase`);
  }
  if (/\s#/.test(value)) {
    fail(`${file}: ${key} contains " #" which YAML reads as a comment; wrap the value in quotes`);
  }
}

function parseFrontmatter(content, file) {
  if (!content.startsWith("---\n")) {
    fail(`${file}: missing opening YAML frontmatter`);
    return {};
  }

  const end = content.indexOf("\n---", 4);
  if (end === -1) {
    fail(`${file}: missing closing YAML frontmatter`);
    return {};
  }

  const data = {};
  const frontmatter = content.slice(4, end).split("\n");
  for (const line of frontmatter) {
    if (!line.trim()) continue;
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      fail(`${file}: unsupported frontmatter line "${line}"`);
      continue;
    }
    checkScalar(match[2].trim(), match[1], file);
    data[match[1]] = match[2].replace(/^["']|["']$/g, "").trim();
  }
  return data;
}

if (!fs.existsSync(skillsDir)) {
  fail("skills/ directory not found");
} else {
  const entries = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  if (entries.length === 0) {
    fail("skills/ contains no skill directories");
  }

  for (const entry of entries) {
    const skillName = entry.name;
    const skillPath = path.join(skillsDir, skillName, "SKILL.md");
    const relativePath = path.relative(root, skillPath);

    if (!/^[a-z0-9-]+$/.test(skillName)) {
      fail(`${skillName}: directory name must use lowercase letters, digits, and hyphens`);
    }

    if (!fs.existsSync(skillPath)) {
      fail(`${skillName}: missing SKILL.md`);
      continue;
    }

    const content = fs.readFileSync(skillPath, "utf8");
    const metadata = parseFrontmatter(content, relativePath);
    const lineCount = content.split("\n").length;

    if (!metadata.name) {
      fail(`${relativePath}: missing frontmatter name`);
    } else if (metadata.name !== skillName) {
      fail(`${relativePath}: frontmatter name "${metadata.name}" must match directory "${skillName}"`);
    }

    if (!metadata.description) {
      fail(`${relativePath}: missing frontmatter description`);
    } else if (metadata.description.length < 40) {
      warn(`${relativePath}: description is short; routing may be weak`);
    }

    if (lineCount > 500) {
      warn(`${relativePath}: ${lineCount} lines (>500 ideal). Apply progressive disclosure: keep the workflow in SKILL.md and move detailed reference material (criteria tables, rubrics, domain variants) to references/, with clear pointers from the body. Add a table of contents to any reference file >300 lines.`);
    }
  }
}

for (const message of warnings) {
  console.warn(`Warning: ${message}`);
}

if (errors.length > 0) {
  for (const message of errors) {
    console.error(`Error: ${message}`);
  }
  process.exit(1);
}

console.log("Skill validation passed for Claude Code/Codex SKILL.md structure.");
