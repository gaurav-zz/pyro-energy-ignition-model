# Simulink Model

`pyro_basic_model.slx` is a reference Simulink / Simscape model used to
validate the analytical ignition timing formulation described in
`docs/theory.md`.

The model:
- uses a continuous Simscape electrical network,
- integrates ignition energy via I²R,
- enforces a static ignition time `t_fire`,
- does not perform runtime parameter mutation.

The model is intended for inspection and validation only.