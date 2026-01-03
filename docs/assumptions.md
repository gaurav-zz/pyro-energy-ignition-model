

# Assumptions

This document lists the explicit assumptions used in the Pyrotechnic Ignition Energy Model.
These assumptions define the scope of validity and ensure the model remains simple, transparent, and defensible.

## Electrical Modeling Assumptions
- The igniter is modeled as a pure resistive load with constant resistance $R_{\text{ign}}$.
- Wiring, connectors, and PCB traces are modeled as a lumped series resistance $R_{\text{wire}}$.
- The MOSFET is modeled using a fixed on-state resistance $R_{\text{mos}}$ at the applied gate voltage.
- No intrinsic current limiting or protection behavior is modeled in the MOSFET.

## Battery Assumptions
The battery is modeled as:
- An ideal voltage source $V_{\text{oc}}$
- A series internal resistance $R_{\text{bat}}$

Additionally:
- Battery internal resistance is estimated conservatively from capacity and C-rating.
- State-of-charge dynamics are not modeled.
- Temperature effects and aging are not modeled.
- Battery voltage is assumed approximately constant over the ignition pulse duration.

These assumptions are valid for short-duration (millisecond-scale) high-current events.

## Current and Energy Assumptions
- Ignition current is assumed approximately constant during the firing window.
- Energy accumulation follows the standard resistive dissipation model $I^2R$.
- Ignition occurs when accumulated energy exceeds a fixed threshold $E_{\text{req}}$.
- $E_{\text{req}}$ is assumed to be known from datasheets or empirical testing.

## Control and Timing Assumptions
- Ignition is treated as a single-shot event.
- The firing duration $t_{\text{fire}}$ is computed analytically and enforced via a hard time cutoff.
- No adaptive or feedback-based control is used during the ignition pulse.
- Re-triggering without sufficient cooldown is not considered.

## Simulation Assumptions
- Simulink/Simscape is used to validate the analytical model, not to generate ignition timing.
- Physical networks are continuous and time-invariant during the simulation.
- Initial transient effects are assumed negligible relative to total ignition energy.

## Intended Use

These assumptions are chosen to:
- Keep the model analytically tractable
- Enable straightforward implementation in web or embedded systems
- Avoid unnecessary complexity for educational use

They are not intended to represent a complete flight-qualified ignition system.
