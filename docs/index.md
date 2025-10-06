# AppForge Bench Docs

Welcome to the AppForge Benchmark documentation!  
This site provides dataset details, evaluation guidelines, and leaderboard access.

# Get Started

### Prerequisite

Make sure you have Android Emulator and SDK installed on your machine.

Unzip *AppForge_Bench.zip* and install requirements.

```
cd AppForge_Bench
pip install -r requirements.txt
```

### Environment Setup

You can install our module **AppForge** through:

```python
cd AppForge
pip install -e .[example]
```

### Quick Start Example

We provide an example with *test.py* under *examples*. A quick test with qwen3coder can be run through 

```
python examples/test.py --emulator_id <emulator_id> --bench_folder <position_where_you_pull_the_AppBench_Forge> --sdk_path <sdk_path> \
--model=qwen3coder --runs=example_qwen3 --api_key_path=<api_key_path> --start_id 0 --end_id 1 
```

For example on our machine we run following command:

```
python examples/test.py --emulator_id  emulator-5554 --bench_folder /mnt/AppForge-Bench --sdk_path /home/Android/sdk \
--model=qwen3coder --runs=example_qwen3 --api_key_path=dash_scope.key --start_id 0 --end_id 1 
```

To activate self-fix with compilation feedback, set parameter *--self_fix_attempts*. If you don't have access to model options we provide, you can add more models or just use *--model=naive* to use a naive solution of making no change on the base template instead.

More detailed running parameters can be seen in the source code.


