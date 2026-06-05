# Chapter 13 — Profiling, automated decisions, AI, and model training

**Primary articles:** Art. 4(4) (definition of profiling), Art. 22 (automated decisions), Recital 71 (profiling guidance), reinforced by Art. 13(2)(f) / 14(2)(g) (transparency about logic), Art. 21(2) (object to direct-marketing profiling).
**Walk when:** profiling / scoring / ranking / recommendation / fraud-detection / KYC / hiring / content-moderation / personalization / AI-assist / model-training is detected.

**Note:** EU AI Act applies in parallel (and extends) GDPR for high-risk AI systems. The audit's GDPR chapter focuses on Art. 22 + DPIA + transparency + objection. AI Act conformity is out of scope here but should be flagged when triggered.

---

## What this chapter detects

Most profiling-shaped processing in modern apps is broader than Art. 22. Art. 22 covers **solely automated decisions producing legal or similarly significant effects**. But many profiling activities — recommendation, scoring, embedding-based personalization, ad personalization, A/B-test targeting — raise **transparency, objection, lawful basis, minimization, security, and DPIA** issues even when Art. 22 doesn't strictly apply.

Treat this chapter's scope as: any code path where **personal data drives a decision or output that affects a subject's experience or treatment**.

---

## Discipline

- Every finding here ties to one or more processing-map rows: the model-training activity, the inference activity, the personalization/recommendation activity, etc. If a chapter applies but no row exists, create one in Phase 2 first.
- All findings here additionally route to ch14 (DPIA) for threshold check — profiling and AI training almost always cross ≥ 2 EDPB criteria.

---

## Signals to scan

### Profiling code patterns

| Pattern | Signal |
|---|---|
| Score / rank functions over user features | `score(user) -> float`, `rank_users()`, recommendation engines |
| ML model `predict()` on user features | `model.predict([user_vec])` |
| Fraud-scoring on transactions / signups | rules engines, ML fraud detectors, KYC providers |
| Hiring / candidate ranking | resume parsers, interview scoring |
| Content moderation classifier | `classify(post) -> {ham,spam,abuse}` |
| Pricing personalization | dynamic pricing keyed to user |
| Insurance / credit scoring | regulated context; severity floor High |
| Behavioral segments / cohort assignment | feeds advertising / marketing |
| Embedding generation | `embed(user_text)`, vector store keyed to user |
| LLM features that condition on user context | personalization through prompt or retrieval |

### Solely-automated triggers (Art. 22)

Art. 22 prohibits decisions based **solely** on automated processing that produce **legal or similarly significant effects** unless:
- (a) necessary for contract
- (b) authorized by Union/Member State law
- (c) explicit consent

Even when permitted, subjects must be able to **obtain human intervention, express their point of view, contest the decision** (Art. 22(3)).

EDPB Guidelines on Art. 22 + Recital 71 clarify: "human in the loop" must be **meaningful** — rubber-stamping the model output is still solely automated. Audit signals:

- Decision pipeline outputs are auto-applied (account suspension, refund denial, hiring rejection, content takedown) → Art. 22 territory
- Reviewer queue exists, but reviewers see only the model verdict and click "approve" en masse → likely solely automated in practice
- UI tells user "your application has been processed by our automated system" with no human-review path → confirmed_issue

### Model training data and lineage

- Training data sources: production tables, logs, support transcripts, user-uploaded files? Each source needs a basis (ch02) and purpose declaration (ch06).
- Special category data in training? Special-category overlay applies → DPIA almost certainly needed.
- LLM fine-tuning on customer data? Verify processor terms (ch11) prevent vendor-side use; document.
- Embeddings as derived personal data: an embedding of a user's content / behavior is personal data; same retention / erasure rules apply (ch07).
- Model memorization risk: LLMs/diffusion models can memorize PII present in training; document pretraining due-diligence and red-team checks.

### Transparency about the logic

Art. 13(2)(f) / 14(2)(g) require **meaningful information about the logic involved** plus **the significance and envisaged consequences** of automated decision-making. Audit signal:

- Privacy notice silent on automated decisions → confirmed_issue (also ch03)
- "Our algorithm decides" without describing factors / consequences → confirmed_issue
- Notice describes the logic but the actual model has changed and notice not updated → confirmed_issue

### Objection (Art. 21)

- Profiling for direct marketing: absolute right to object, no balancing test
- Profiling on legitimate-interest basis: right to object available; controller must demonstrate compelling overriding interest
- Audit signal: a "stop personalizing my feed" / "opt out of recommendations" route — most apps don't have one

### Vector stores / RAG / agentic systems

These are increasingly common and audited as profiling-adjacent:

- Personal data ingested into vector DB without consent / LIA + retention policy → confirmed_issue
- Vector DB shared across tenants → tenant isolation (ch09) + minimization (ch06) findings
- Agent tools called against personal data (e.g., agent reads user's calendar / email) → log every access (ch10), apply purpose limitation
- Prompt injection risk leaking other users' data → security finding (ch09); GDPR finding for confidentiality (Art. 5(1)(f))

### Stack-specific examples

| Stack | Concrete pattern |
|---|---|
| Recommendation libs (recsys, lightfm, surprise) | training data source, retention, objection mechanism |
| Vertex AI / SageMaker / Azure ML | check region (ch12); training-data lineage |
| Hugging Face | model uploaded with embedded user data; hub privacy concerns |
| OpenAI / Anthropic API | conversation logged on vendor side; check zero-retention; check fine-tuning terms |
| Pinecone / Weaviate / Qdrant | vector DB keyed by user_id; check region; erasure pipeline |
| LangChain / LlamaIndex agent tooling | tool calls expose personal data; log each call |
| Metaflow / MLflow / Weights & Biases | training metadata might include PII (e.g., dataset rows logged) |
| Adtech (DV360, TheTradeDesk, Meta Ads) | personalized ads from custom audiences → consent (ch04 + ch05); profiling overlay |

### Plan / spec signals

- Plan describes a model trained on user behavior with no basis / DPIA / objection mechanism → confirmed_issue
- "We'll add personalization later" with no privacy review path → likely_issue
- Spec uses "we anonymize before training" without defining the anonymization → likely_issue
- AI Act high-risk use cases (employment, education, credit, public services, biometric ID) without acknowledgment → likely_issue / advisory (cross-frame)

---

## False-positive controls

- Spam filtering on user content using a generic classifier with no per-user model is not Art. 22 territory unless it produces "similarly significant effects" (e.g. account ban).
- Search ranking that uses generic relevance signals isn't profiling under Art. 4(4) — but if it personalizes by user features, it is.
- A/B testing that randomly assigns variants is not profiling (no evaluation of the subject's traits) — unless cohort assignment uses personal features.
- Transparency about logic doesn't require revealing the model's weights — the EDPB allows describing input categories, weighting principles, and consequences, without source code disclosure.

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| Solely-automated decision with legal/significant effect, no Art. 22(2) basis | Critical | confirmed_issue |
| Art. 22 process with no human-intervention path | Critical | confirmed_issue |
| Profiling with no transparency in privacy notice | High | confirmed_issue |
| Marketing profiling with no Art. 21(2) opt-out | High | confirmed_issue |
| Production data → ML training without basis / consent / LIA | High floor (Critical with special category) | confirmed_issue |
| Vector store / embeddings: no erasure pipeline | High | confirmed_issue |
| LLM API used; vendor terms / data-use mode not visible in code or plan | High | evidence_gap (escalate to confirmed_issue Critical only when positive evidence shows training-on / consumer terms apply, e.g. consumer API key in use, no enterprise/business org, no zero-retention header) |
| Notice mentions algorithm but doesn't describe consequences | Medium | confirmed_issue |
| AI Act high-risk system without conformity acknowledgment | Medium | advisory (out of scope, but should be flagged) |

Apply special-category overlay → automatic DPIA (ch14); severity floor +1.
Apply children's overlay → no behavioral profiling on minors regardless of consent.

---

## Sample findings

```
F-121
  Severity: Critical / Confidence: High / Type: confirmed_issue
  Articles: Art. 22(1), Art. 22(3), Art. 13(2)(f)
  Risk to rights: subjects subject to automated decisions affecting their access to the service, with no recourse to human review and no transparency about the logic.
  Location: src/services/moderation.py:42
  Affected data: full account history, content, language model output
  Affected subjects: end users
  Processing activity: content moderation / account suspension
  Evidence:
    verdict = model.predict([user_features, content_embedding])
    if verdict == 'ban':
        suspend_account(user.id)            # auto-applied; no review queue
  Recommended fix: route every automated suspension into a review queue with a meaningful human approval step (the reviewer must see the inputs, not just the verdict, and have authority to override); add a user-facing path to obtain human review on appeal; update the privacy notice to describe the inputs, the consequences, and the appeal process; produce a DPIA (ch14).
  Verification needed: review-queue UI/handler with approval gate; appeal endpoint and SLA; updated privacy notice; DPIA artifact.
```

```
F-122
  Severity: High / Confidence: High / Type: confirmed_issue
  Articles: Art. 5(1)(b), Art. 5(1)(e), Art. 17
  Risk to rights: erasure does not propagate to derived personal data; subjects' embeddings persist in the vector DB after deletion.
  Location: src/services/rag.ts:8 + cron/embed.ts
  Affected data: user-content embeddings keyed by user_id
  Affected subjects: end users
  Processing activity: RAG knowledge base
  Evidence:
    Embeddings indexed on every user create/update; no deletion handler; on user erasure (`deleteUser`), no call to `vectorDB.deleteByUserId`.
  Recommended fix: subscribe to user-erasure events and propagate to the vector store; for full re-train scenarios, exclude erased subjects from the training set and document the cadence; if model fine-tuning included personal data, document the unlearning approach (re-train without the data on a defined schedule).
  Verification needed: erasure handler with vector-store call; integration test demonstrating erased user's embeddings are gone; documented re-train schedule.
```

---

## Evidence needed to close

- Per-pipeline lawful basis + purpose + retention for training data, derived data, and inferences.
- Human-in-the-loop design documented for any decision producing legal / significant effects, with reviewer-level evidence (not just queue existence).
- Privacy-notice section on automated decisions and profiling logic / consequences.
- Objection mechanism for marketing profiling and (where applicable) LI-based profiling.
- Erasure pipeline covering vector stores and ML feature stores.
- For LLM / GenAI: vendor terms (ch11), zero-retention config, region (ch12), input-side PII redaction, and prompt-injection threat model.
- DPIA (ch14) when triggered.
- AI Act conformity acknowledgment for high-risk use cases (out of GDPR scope but flagged).
