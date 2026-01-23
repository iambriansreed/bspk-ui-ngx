# Bespoke UI-NGX

Bespoke UI NGX package contains all the angular components that are available for Anywhere Real Estate development teams.

https://bspk.anywhere.re

## Installation

```bash
npm install @bspk/ui-ngx
```

```bash
npm install --peer @bspk/styles @floating-ui/dom
```

## Setup

Ensure you your theme stylesheet from `@bspk/styles` and the base and color stylesheets.

```scss
@use '@bspk/styles/anywhere.css';
@use '@bspk/ui-ngx/src/styles/base';
@use '@bspk/ui-ngx/src/styles/colors';
```

## Testing

To test all components

```bash
npm run test
```

To test a specific component

```bash
npm run test <componentname>
```

<!--- Copyright 2026 Anywhere Real Estate - CC BY 4.0 -->
