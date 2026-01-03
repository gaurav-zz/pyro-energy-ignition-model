# Pyrotechnic Ignition Energy Model

## Overview

This repository presents a physics-based, energy-driven pyrotechnic ignition timing model, validated using MATLAB Simulink/Simscape and mapped to an analytical equation for web-based calculation.

The model replaces fixed, heuristic firing delays with defensible ignition-time computation based on electrical and physical parameters: battery voltage, internal resistance, wiring resistance, and igniter characteristics.

## Core Principle

Pyrotechnic igniters are energy-driven, not time- or current-driven.

Ignition occurs when sufficient thermal energy is deposited in the igniter bridgewire:

$$E(t) = \int_0^t I^2(t)\,R_{\text{ign}}\,dt$$

Instead of assuming a fixed delay, this model:
- Computes the minimum required firing time analytically
- Applies a conservative safety factor
- Enforces a hard time cutoff

## Ignition Time Equation

Assuming a short-duration pulse and approximately constant current:

$$t_{\min}=\frac{
E_{\text{req}} \cdot R_{\text{total}}^2
}{
V_{\text{oc}}^2 \cdot R_{\text{ign}}
}
$$

Where:
- `E_req` — required ignition energy
- `R_ign` — igniter resistance
- `V_oc` — battery open-circuit voltage
- `R_total` = `R_ign` + `R_wire` + `R_bat` + `R_mos`

Final commanded firing time:

$$t_{\text{fire}} = \text{Safety Factor} \times t_{\min}$$

This equation is used consistently across documentation, web implementation, and simulation validation.

## Battery Modeling

For short (millisecond-scale) ignition events, the battery is modeled as:
- An ideal voltage source $V_{\text{oc}}$
- With series internal resistance $R_{\text{bat}}$

Internal resistance is derived conservatively from capacity and C-rating:

$$R_{\text{bat}} \approx \frac{V_{\text{oc}}}{C_r \cdot Q}$$

This approach avoids unnecessary state-of-charge dynamics while remaining physically realistic for high-current pulses.

## Simulink/Simscape Model

The Simulink model is used to validate, not generate, the ignition timing law.

**Model characteristics:**
- Continuous Simscape electrical network
- NMOS low-side switching
- Energy computed via I²R integration
- Static t_fire enforced via Simulink control logic
- No runtime parameter mutation
- No intrinsic current limiting modeled

The model demonstrates correct abstraction selection and clear separation between physical modeling (Simscape) and control logic (Simulink).

## Repository Structure

```
pyro-energy-ignition-model/
├── simulink/
│   ├── pyro_model_basic.slx
│   └── README.md
├── docs/
│   ├── theory.md
│   ├── assumptions.md
│   └── limitations.md
├── web/
│   ├── index.html
│   ├── src/
│   │   └── ignition.ts
│   ├── dist/
│   │   └── ignition.js
│   └── README.md
├── images/
│   ├── block_diagram.png
│   └── energy_plot.png
└── README.md
```

## Web Implementation

The ignition timing equation is implemented in a web-based calculator:
- Compute t_fire from input electrical and igniter parameters
- Display results with safety factor adjustments
- Visualize energy accumulation and timing
- No server-side computation required

The interactive interface makes the model accessible for education and quick calculations.

## Assumptions and Limitations

Key assumptions are documented explicitly in [docs/assumptions.md](docs/assumptions.md), including:
- Igniter modeled as fixed resistance
- Battery modeled as voltage source plus internal resistance
- No post-ignition electrical behavior modeled
- No intrinsic current limiting
- Single-shot ignition only

Model limitations and non-goals are documented in [docs/limitations.md](docs/limitations.md).

## Disclaimer

> This project is intended for educational and exploratory purposes only. It is not certified, qualified, or validated for flight or safety-critical systems. Users are responsible for ensuring safe implementation in real hardware.

