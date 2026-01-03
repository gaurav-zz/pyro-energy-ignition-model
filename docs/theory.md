
# Theory: Energy-Based Pyrotechnic Ignition

## Purpose of the Model

The purpose of this model is to derive a deterministic ignition time for a pyrotechnic igniter based on physical energy requirements, rather than fixed delays or heuristic timing.

The model focuses on short-duration, high-current electrical events and aims to remain:
- Analytically tractable
- Straightforward to implement in web or embedded systems
- Physically defensible

## Fundamental Ignition Principle

Pyrotechnic igniters function by converting electrical energy into thermal energy within a bridgewire or similar resistive element.

Ignition occurs when the accumulated thermal energy exceeds a minimum required value:

$$E(t) = \int_0^t I^2(t)\,R_{\text{ign}}\,dt$$

Where:
- $I(t)$ is the current through the igniter
- $R_{\text{ign}}$ is the igniter resistance
- $E(t)$ is the electrical energy dissipated as heat

Ignition condition:

$$E(t) \ge E_{\text{req}}$$

$E_{\text{req}}$ is igniter-specific and typically obtained from datasheets or empirical testing.

## Electrical System Abstraction

For millisecond-scale ignition events, the system is modeled as a lumped series network:

$$R_{\text{total}} = R_{\text{ign}} + R_{\text{wire}} + R_{\text{bat}} + R_{\text{mos}}$$

Where:
- $R_{\text{wire}}$ represents harness, connector, and PCB resistance
- $R_{\text{bat}}$ represents battery internal resistance
- $R_{\text{mos}}$ represents MOSFET on-state resistance

The battery is modeled as an ideal voltage source with series resistance.

## Current Approximation

For short firing pulses, current is conservatively approximated as constant:

$$I \approx \frac{V_{\text{oc}}}{R_{\text{total}}}$$

Where $V_{\text{oc}}$ is the battery open-circuit voltage.

This assumption intentionally underestimates ignition speed, making it suitable for minimum-time calculations.

## Ignition Time Derivation

Substituting the current approximation into the energy equation:

$$E_{\text{req}} = I^2 R_{\text{ign}} t$$

$$E_{\text{req}} = \left(\frac{V_{\text{oc}}}{R_{\text{total}}}\right)^2 R_{\text{ign}}\, t$$

Solving for time yields the minimum ignition time:

$$t_{\min} = \frac{E_{\text{req}} \cdot R_{\text{total}}^2}{V_{\text{oc}}^2 \cdot R_{\text{ign}}}$$

## Safety Factor and Commanded Time

To account for uncertainties such as:
- Resistance variation
- Battery voltage sag
- Manufacturing tolerances
- Modeling simplifications

a safety factor is applied:

$$t_{\text{fire}} = \text{Safety Factor} \times t_{\min}$$

Typical safety factor values range from 2.5 to 4.0, depending on conservatism requirements.

## Battery Internal Resistance Estimation

For short pulses, detailed electrochemical modeling is unnecessary. Battery behavior is captured through internal resistance.

A conservative estimate derived from datasheet parameters:

$$R_{\text{bat}} \approx \frac{V_{\text{oc}}}{C_r \cdot Q}$$

Where:
- $C_r$ is the battery C-rating
- $Q$ is capacity in ampere-hours

This bounds current delivery without modeling state-of-charge dynamics.

## Role of Simulation

The Simulink/Simscape model is used to validate the analytical formulation by confirming that:
- Current magnitude matches theoretical expectations
- Energy accumulation follows I²R behavior
- Ignition energy is reached within the computed time
- Hard cutoff prevents excessive energy delivery

Simulation is not used to determine ignition time directly.

## Design Implications

This formulation highlights several important design truths:
- MOSFETs do not limit current; the circuit does
- High C-rating batteries can greatly exceed ignition energy needs
- Time-bounded firing is essential to prevent excess energy deposition
- Energy-based logic scales across igniter types and power sources

These implications motivate energy-driven timing over fixed delays.

## Scope of Validity

This theory applies to:
- Single-shot pyrotechnic ignition
- Millisecond-scale firing durations
- Resistive igniters
- Systems without active current regulation

It does not model:
- Post-ignition electrical behavior
- Thermal runaway or aging
- Repeated firing without cooldown
- Certification-level safety margins

## Summary

This theory establishes a direct, defensible link between:
- Physical ignition requirements
- Electrical system parameters
- Web-based or embedded timing logic

The result is a simple, reusable ignition timing law grounded in first principles and validated through simulation.

