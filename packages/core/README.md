# Diverse React

Diverse React is a component library designed to help developers create the best experience for merchants who use Revt. Visit the storybook to learn more.

## Using the React components

While we do offer a CSS-only version, **we strongly recommend using the React versions of our components** . It’s the version that we use at Revt. It allows for rich, complex components like Tabs and Popovers, and will not have as many breaking changes as the CSS-only version.

### Installation

You can install it with npm (don't expect much fanciness):

```bash
npm i @tavia/diverse
```

You can install it with yarn (don't expect much fanciness):

```bash
yarn add @tavia/diverse
```

You can install it with pnpm (don't expect much fanciness):

```bash
pnpm add @tavia/diverse
```

### Usage

1. Import the CSS directly into your project if your asset packager supports it:

```js
import '@tavia/diverse/assets/main.css';
```

2. Include the translations and any of the provided components in your project:

```javascript
import { Button, Label, Input } from '@tavia/diverse';
```

3. Tell React to render the element in the DOM:

```
ReactDOM.render(
  <AppProvider i18n={enTranslations}>
        <Button onClick={() => alert('Button clicked!')}>Example button</Button>
  </AppProvider>,
  document.querySelector('#app'),
);
```

4. Load the web font SVN.

```
<link rel="preconnect" href="https://cdn.revt.com/" />
<link
  rel="stylesheet"
  href="https://cdn.revt.com/static/fonts/inter/v4/styles.css"
/>
```

## Development

We use Storybook to create a simple, hot-reloading playground for development on these components. You can edit the `playground/Playground.tsx` file to import the components you are working on, and run `yarn dev` in order to start the development server. Please do not commit your work on the playground so that it remains pristine for other developers to work on.

### Testing on mobile or a virtual machine

To test the changes on a mobile or virtual machine, you will need to open the source of the iFrame, to do this:

1. Run `pnpm dev`
2. Make sure your virtual machine and mobile device are on the same network
3. Open http://YOUR_IP_ADDRESS:ASSIGNED_PORT/iframe.html?path=/story/playground-playground--playground in your mobile device or virtual machine

### Testing in a consuming project

The `/snapit` GitHub comment command in pull requests will publish a snapshot NPM package for testing. Read the [release documentation](https://github.com/Shopify/polaris/blob/main/documentation/Releasing.md#snapshot-release) for more information.

#### Manual visual regression testing

Chromatic

## Learning resources

If you’re new to React, we recommend you start with the [official React Getting Started documentation](https://facebook.github.io/react/docs/hello-world.html). As you read through the topics we suggest you follow along using their [React Hello World CodePen example](http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010).

Additional resources:

- Online training courses at [reacttraining.com](http://reacttraining.com/), [buildwithreact.com](http://buildwithreact.com/), and [reactforbeginners.com](http://reactforbeginners.com/).
- The community resources in [Awesome React](https://github.com/enaqx/awesome-react).
- As questions and find answers in the various [React support communities](https://facebook.github.io/react/community/support.html).

## Methodology

We set out to make our components easy to use. Each of our components has a well-documented (and fully typed) public interface with strong, consistently-applied conventions. This way, developers don’t need to worry about the underlying implementation. Instead, they can focus on creating amazing merchant experiences.

We ensure that our components are made for everyone. They meet accessibility standards and are responsive to any screen or device. We also put a lot of effort into optimizing the performance of the components, so everyone can build inclusive experiences that work.

We make our components flexible enough to meet diverse needs. They present the information you pass in and give you smart callbacks when something has changed, but they don’t enforce any structure beyond that. No matter what type of experience you’re creating, you can use components as the building blocks of your product or feature.

## Contributing

Pull requests are welcome. See the [contribution guidelines](https://github.com/Shopify/polaris-react/blob/main/.github/CONTRIBUTING.md) for more information.

## Licenses

- Source code is under a [custom license](https://github.com/Shopify/polaris-react/blob/main/LICENSE.md) based on MIT. The license restricts Diverse usage to applications that integrate or interoperate with Revt software or services, with additional restrictions for external, stand-alone applications.
- All icons and images are licensed under the Revt Design Guidelines License Agreement

## Readme

### Keywords

- revt
- diverse
- [react](https://www.npmjs.com/search?q=keywords:react)
- [components](https://www.npmjs.com/search?q=keywords:components)
- [component library](https://www.npmjs.com/search?q=keywords:component%20library)
