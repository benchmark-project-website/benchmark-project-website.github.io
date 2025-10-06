
# AppForge-Bench

A benchmark suite for **LLM-based Android application synthesis and testing**.  
AppForge-Bench provides reproducible environments, Android emulator integration, and self-fix mechanisms for evaluating code generation and UI behavior across large-scale Android apps.

---

## 🚀 Quick Start

### 🔧 Prerequisite
Make sure you have **Android Emulator** and **Android SDK** installed on your machine.

Unzip the benchmark package and install dependencies:

```bash
cd AppForge_Bench
pip install -r requirements.txt
```

---

### ⚙️ Environment Setup

You can install our module **AppForge** in editable mode:

```bash
cd AppForge
pip install -e .[example]
```

---

### 🧠 Example Run

We provide an example script `test.py` under the `examples/` folder.

A quick test with **qwen3coder** can be executed using:

```bash
python examples/test.py \
  --emulator_id <emulator_id> \
  --bench_folder <path_to_AppForge_Bench> \
  --sdk_path <sdk_path> \
  --model qwen3coder \
  --runs example_qwen3 \
  --api_key_path <api_key_path> \
  --start_id 0 \
  --end_id 1
```

**Example on our machine:**

```bash
python examples/test.py \
  --emulator_id emulator-5554 \
  --bench_folder /mnt/AppForge-Bench \
  --sdk_path /home/Android/sdk \
  --model qwen3coder \
  --runs example_qwen3 \
  --api_key_path dash_scope.key \
  --start_id 0 \
  --end_id 1
```

---

### 🧩 Optional: Self-Fix with Compilation Feedback

To activate self-fix (automatic repair using compilation feedback), set the parameter:

```bash
--self_fix_attempts <N>
```

If you don't have access to the provided model options, you can:

* Add your own model integration, **or**
* Use `--model=naive` to apply a baseline that makes no change to the base template.

> ℹ️ More detailed running parameters are available in the source code.


---

#### 📦 Downloads
[⬇️ Download AppForge.zip](https://github.com/benchmark-project-website/benchmark-project-website.github.io/releases/download/v1.0.0/AppForge.zip){ .md-button .md-button--primary }
[⬇️ Download AppForge_Bench.zip](https://github.com/benchmark-project-website/benchmark-project-website.github.io/releases/download/v1.0.0/AppForge_Bench.zip){ .md-button }
