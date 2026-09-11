<!--
version: 0.0.1
language: en
mode: Presentation
comment: Real LiaScript autoscrolling regression fixture.
import: ../README.md
-->

# Default scrolling

Scrolling is enabled before the first macro.

<div style="height: 110vh"></div>

{{1}}
Default reveal.

## Explicit off

@autoscrolling(off)

This slide disables animation scrolling for the following slides.

<div style="height: 110vh"></div>

{{1}}
Explicit off reveal.

## Inherited off

This slide has no macro and inherits off.

<div style="height: 110vh"></div>

{{1}}
Inherited off reveal.

## Inherited off again

The off value must survive another slide replacement.

<div style="height: 110vh"></div>

{{1}}
Inherited off again reveal.

## Explicit on

@autoscrolling(on)

This slide enables animation scrolling again.

<div style="height: 110vh"></div>

{{1}}
Explicit on reveal.

## Inherited on

This slide has no macro and inherits on.

<div style="height: 110vh"></div>

{{1}}
Inherited on reveal.
