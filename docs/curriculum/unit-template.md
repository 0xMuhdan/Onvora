# Curriculum Authoring Contract — Unit Template

Sumber: Onvora.md §6, §28; Revision §44.
Setiap Unit **wajib** mengisi seluruh field di bawah. Unit tidak dapat dipublish jika ada field wajib kosong (ONV-05 FR-05-002).

> Isi materi adalah intellectual property & content workstream tim Onvora (DEC-014). File ini hanya struktur.

```yaml
unit:
  id: ""                     # slug stabil, mis. web3-basics-01-web3-overview
  title: ""                  # UNIT TITLE
  track: ""                  # mis. ethereum-developer
  phase: ""                  # mis. phase-1-understand
  knowledge_scope: core      # core | ecosystem
  chain_adapter: null        # null jika core, mis. ETH jika ecosystem
  target_level: beginner     # awareness | beginner | developing | proficient | advanced

  why: ""                    # WHY — mengapa unit ini penting
  target: ""                 # TARGET — untuk siapa
  prerequisites: []          # PREREQUISITES — unit/concept id
  outcomes: []               # OUTCOMES — measurable, diawali kata kerja ("Menjelaskan…", "Membedakan…")

  lessons:                   # LESSONS — alur: Context → Concept → Example → Interaction → Practice → Checkpoint → Reflection → Next step
    - id: ""
      title: ""
      concepts: []
      learning_modes: [read]   # read | watch | interact | code | explain | build | teach
      estimated_minutes: 0

  interactive: []            # INTERACTIVE — simulation/interactive block id
  practice: []               # PRACTICE — exercise id
  checkpoint: ""             # CHECKPOINT — assessment id
  mini_project: ""           # MINI PROJECT — guided project id (boleh null jika unit konseptual murni, wajib alasan)
  common_mistakes: []        # COMMON MISTAKES
  security: []               # SECURITY — Risk / Why it matters / Practice / Mitigation
  evidence: []               # EVIDENCE — evidence type yang dihasilkan unit ini
  skills: []                 # skill id yang diberi evidence

  estimated_time_minutes: 0  # ESTIMATED TIME
  author: ""                 # AUTHOR
  technical_reviewer: ""     # TECHNICAL REVIEWER
  curriculum_reviewer: ""    # CURRICULUM REVIEWER
  security_reviewer: ""      # SECURITY REVIEWER (Revision §44)
  review_date: ""            # REVIEW DATE (YYYY-MM-DD)
  version: 1
  deprecated: false
```

## Aturan Penulisan
- Bahasa Indonesia profesional; istilah teknis tetap English.
- Outcome harus dapat diukur oleh checkpoint/practice.
- Web3 Basics tidak boleh membutuhkan wallet atau dana nyata.
- Hindari project bertema NFT/token/DeFi clone sebagai default; gunakan Real-World Problem Library.
