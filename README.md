# Angular App Captcha

A simple, lightweight, and customizable CAPTCHA library for Angular applications. This library provides three types of CAPTCHA verification to protect your application from automated bot attacks.

## Overview

**Angular App Captcha** is an Angular library designed to integrate CAPTCHA functionality into your applications with minimal setup. It supports multiple CAPTCHA types including text-based, math-based, and interactive verification modes.

## Features

- **Multiple CAPTCHA Types**:
  - Type 1: Text-based CAPTCHA (random alphanumeric characters)
  - Type 2: Math-based CAPTCHA (simple arithmetic problems)
  - Type 3: Interactive "I'm not a robot" checkbox verification

- **Customizable Configuration**:
  - Font customization (family, size, color)
  - Background styling (solid color, stroke effects)
  - Custom CSS classes for styling
  - Adjustable CAPTCHA code length

- **Audio Support**: Text-to-speech functionality for accessibility (read CAPTCHA code aloud)

- **Easy Integration**: Simple module import and component usage

- **RxJS Observable Support**: Real-time CAPTCHA status updates via observables

## Project Structure

```
angular-app-captcha/
├── projects/
│   └── angular-app-captcha/          # Library source code
│       ├── src/
│       │   ├── lib/
│       │   │   ├── angular-app-captcha.component.ts       # Main CAPTCHA component
│       │   │   ├── angular-app-captcha.component.spec.ts  # Component tests
│       │   │   ├── angular-app-captcha.service.ts         # CAPTCHA status service
│       │   │   ├── angular-app-captcha.service.spec.ts    # Service tests
│       │   │   ├── angular-app-captcha.module.ts          # Library module
│       │   │   ├── angular-app-captcha.config.ts          # Configuration interface
│       │   │   └── public-api.ts                          # Public API exports
│       │   └── tsconfig files
│       ├── ng-package.json
│       └── package.json
├── src/
│   ├── app/
│   │   ├── app.component.ts          # Demo application
│   │   ├── app.module.ts
│   │   └── captcha/                  # Local captcha implementation
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json                      # Angular CLI configuration
├── package.json                      # Project dependencies
├── tsconfig.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- Angular CLI v21.1.0
- Angular v21.1.0
- TypeScript v5.9.0 or higher

### Install Dependencies

```bash
npm install
```

## Usage

### 1. Import the Module (For Module-based Applications)

In your `app.module.ts`:

```typescript
import { AppCaptchaModule } from 'angular-app-captcha';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppCaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2. Use the Component (Standalone)

The `AppCaptchaComponent` is now a standalone component that can be imported directly:

In your standalone component or module:

```typescript
import { AppCaptchaComponent } from 'angular-app-captcha';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppCaptchaComponent],
  template: `<angular-app-captcha></angular-app-captcha>`
})
export class AppComponent { }
```

### 3. Use the Component in Templates

In your template (`.html`):

```html
<angular-app-captcha></angular-app-captcha>
```

### 3. Configure the CAPTCHA

In your component (`.ts`):

```typescript
import { Component } from '@angular/core';
import { CaptchaConfig, CaptchaService } from 'angular-app-captcha';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private captchaService: CaptchaService, private config: CaptchaConfig) {
    // Set CAPTCHA type
    this.config.type = 1; // 1: Text, 2: Math, 3: Interactive

    // Configure font
    this.config.font = {
      size: '40px',
      family: 'Arial',
      color: '#000000'
    };

    // Configure background
    this.config.back = {
      solid: '#fbfbfb',
      stroke: '' // Optional stroke pattern
    };

    // Other options
    this.config.length = 6; // Length of captcha code
    this.config.cssClass = 'my-custom-class'; // Custom CSS class

    // Subscribe to CAPTCHA status
    this.captchaService.captchaStatus.subscribe((status: boolean | null) => {
      if (status === true) {
        console.log('CAPTCHA verified successfully!');
      } else if (status === false) {
        console.log('CAPTCHA verification failed!');
      }
    });
  }
}
```

## Configuration Options

### CaptchaConfig Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | number | 1 | CAPTCHA type (1: Text, 2: Math, 3: Interactive) |
| `length` | number | 6 | Length of the CAPTCHA code |
| `cssClass` | string | '' | Custom CSS class for styling |
| `font.size` | string | '40px' | Font size for CAPTCHA text |
| `font.family` | string | 'Arial' | Font family for CAPTCHA text |
| `font.color` | string | '#000000' | Font color for CAPTCHA text |
| `back.solid` | string | '#fbfbfb' | Background color |
| `back.stroke` | string | '' | Stroke pattern (leave empty for no stroke) |

## CAPTCHA Types

### Type 1: Text-Based CAPTCHA
Random alphanumeric characters displayed on canvas with optional noise strokes.

### Type 2: Math-Based CAPTCHA
Simple arithmetic problems (addition/subtraction) for user verification.

### Type 3: Interactive CAPTCHA
Interactive "I'm not a robot" checkbox where users click within a checkbox to verify.

## Available Methods

### CaptchaComponent

- `createCaptcha()`: Generates a new CAPTCHA based on the configured type
- `playCaptcha()`: Plays audio pronunciation of the CAPTCHA code (accessibility feature)
- `checkCaptcha()`: Validates the user input against the generated CAPTCHA code

### CaptchaService

- `setCaptchaStatus(code: boolean)`: Updates the CAPTCHA verification status
- `get captchaStatus()`: Returns an Observable of the CAPTCHA status

## Development

### Development Server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

### Build the Library

To build the library for distribution:

```bash
npm run build
```

The build artifacts will be stored in the `dist/angular-app-captcha/` directory.

### Watch Mode

Build the library in watch mode for development:

```bash
npm run watch
```

### Running Tests

Execute unit tests via Karma:

```bash
npm test
```

## Project Dependencies

### Runtime Dependencies
- `@angular/animations`: ^21.1.0
- `@angular/common`: ^21.1.0
- `@angular/compiler`: ^21.1.0
- `@angular/core`: ^21.1.0
- `@angular/forms`: ^21.1.0
- `@angular/platform-browser`: ^21.1.0
- `@angular/platform-browser-dynamic`: ^21.1.0
- `@angular/router`: ^21.1.0
- `rxjs`: ~7.8.0
- `tslib`: ^2.6.0
- `zone.js`: ~0.15.0

### Development Dependencies
- `@angular-devkit/build-angular`: ^21.1.0
- `@angular/cli`: ~21.1.0
- `@angular/compiler-cli`: ^21.1.0
- `@types/jasmine`: ~5.1.0
- `jasmine-core`: ~5.1.0
- `karma`: ~6.4.0
- `karma-chrome-launcher`: ~3.2.0
- `karma-coverage`: ~2.2.0
- `karma-jasmine`: ~5.1.0
- `karma-jasmine-html-reporter`: ~2.1.0
- `ng-packagr`: ^21.1.0
- `typescript`: ~5.9.0

## Recent Updates (v1.1.1)

### Angular 21 Migration
- **Upgraded to Angular 21.1.0** from Angular 16.2.0
- **TypeScript updated** to v5.9.0
- **Standalone Components**: `AppCaptchaComponent` is now a standalone component
- **Module Export**: `AppCaptchaModule` now imports the standalone component for backward compatibility
- **ModuleResolution**: Updated from 'node' to 'bundler' in tsconfig for better ESM support
- **Zone.js**: Updated to v0.15.0

### Key Changes
- The library now fully supports Angular's standalone component architecture
- Existing module-based applications continue to work through the `AppCaptchaModule`
- All dependencies updated to their latest stable versions compatible with Angular 21
- Improved build performance with ng-packagr 21

## Version

**Current Version**: 1.1.1

## Author

Deepak

## License

None (Custom License)

## Repository

GitHub: [https://github.com/deepak1887/angular-app-captcha](https://github.com/deepak1887/angular-app-captcha)

## Support

For issues and feature requests, please visit the [GitHub Issues](https://github.com/deepak1887/angular-app-captcha/issues) page.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to improve this library.

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI Reference](https://angular.io/cli)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
