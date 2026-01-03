
# Limitations

This document outlines the known limitations and non-goals of the Pyrotechnic Ignition Energy Model.
These limitations are intentional and aligned with the project's educational and exploratory scope.

## Electrical and Physical Limitations
- The model does not include any intrinsic current limiting.
- MOSFET drain current ratings are not treated as current clamps.
- Very high C-rating batteries may deliver currents far exceeding the minimum ignition requirement.
- Excess energy beyond the ignition threshold may be deposited if firing duration is not properly bounded.

The model relies on time-bounded firing to control energy delivery.

## Igniter Behavior Limitations
- Post-ignition electrical behavior of the igniter is not modeled.
- Bridgewire rupture, plasma formation, or resistance change after ignition is not considered.
- Igniter-to-igniter variability beyond resistance and energy threshold is not modeled.

The igniter is treated as a single-use resistive load.

## Thermal Limitations
- MOSFET junction temperature rise is not explicitly modeled.
- Thermal coupling to PCB copper, airflow, or ambient conditions is not included.
- Thermal fatigue, aging, and repeated firing effects are not considered.

Transient thermal safety must be verified separately for real hardware.

## Battery Limitations
- Battery internal resistance is estimated conservatively and may differ from real cells.
- Voltage sag dynamics beyond simple resistive drop are not modeled.
- Battery protection circuitry (BMS behavior) is not modeled.
- Short-circuit protection, current foldback, or shutdown behavior is not represented.

## Control and Safety Limitations
- The model does not include fault detection or redundancy.
- No continuity checking or igniter presence verification is modeled.
- No interlocks, safing logic, or inhibit mechanisms are included.
- Repeated or rapid re-triggering is not considered.

These features are intentionally excluded to keep the model focused.

## Certification and Responsibility
- This model is not flight-certified.
- It is not validated for safety-critical use.
- It does not comply with any aerospace, rocketry, or industrial certification standards.

Use of this model in real systems requires independent verification, testing, and safety review.

## Summary

These limitations reflect deliberate design choices:
- Prioritize clarity over completeness
- Demonstrate correct abstraction
- Avoid overclaiming safety or applicability

The model is intended as a reference and learning tool, not as a drop-in ignition system.

