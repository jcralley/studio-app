import { MyButton } from '../../src/components/my-button';
import '../../src/components/my-button';

QUnit.module('MyButton Component', function () {

  QUnit.test('should create button with default properties', function (assert) {
    const button = new MyButton();
    assert.equal(button.label, 'Button', 'Default label should be "Button"');
    assert.equal(button.variant, 'primary', 'Default variant should be "primary"');
    assert.equal(button.disabled, false, 'Default disabled should be false');
  });

  QUnit.test('should render button with correct label', async function (assert) {
    const done = assert.async();

    try {
      const button = document.createElement('my-button') as MyButton;
      button.label = 'Test Button';
      document.body.appendChild(button);

      await button.updateComplete;

      const buttonElement = button.shadowRoot?.querySelector('button');
      assert.ok(buttonElement, 'Button element should exist');
      assert.equal(buttonElement?.textContent?.trim(), 'Test Button', 'Button should display correct label');

      document.body.removeChild(button);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });

  QUnit.test('should apply correct CSS class for variant', async function (assert) {
    const done = assert.async();

    try {
      const button = document.createElement('my-button') as MyButton;
      button.variant = 'secondary';
      document.body.appendChild(button);

      await button.updateComplete;

      const buttonElement = button.shadowRoot?.querySelector('button');
      assert.ok(buttonElement?.classList.contains('secondary'), 'Button should have secondary class');

      document.body.removeChild(button);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });

  QUnit.test('should be disabled when disabled property is true', async function (assert) {
    const done = assert.async();

    try {
      const button = document.createElement('my-button') as MyButton;
      button.disabled = true;
      document.body.appendChild(button);

      await button.updateComplete;

      const buttonElement = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      assert.ok(buttonElement.disabled, 'Button should be disabled');

      document.body.removeChild(button);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });

  QUnit.test('should fire button-click event when clicked', async function (assert) {
    const done = assert.async();

    try {
      const button = document.createElement('my-button') as MyButton;
      button.label = 'Click Me';
      button.variant = 'success';
      document.body.appendChild(button);

      await button.updateComplete;

      let eventFired = false;
      button.addEventListener('button-click', (e: any) => {
        eventFired = true;
        assert.equal(e.detail.label, 'Click Me', 'Event should contain button label');
        assert.equal(e.detail.variant, 'success', 'Event should contain button variant');
      });

      const buttonElement = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      buttonElement.click();

      assert.ok(eventFired, 'button-click event should be fired');

      document.body.removeChild(button);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });

  QUnit.test('should not fire event when disabled and clicked', async function (assert) {
    const done = assert.async();

    try {
      const button = document.createElement('my-button') as MyButton;
      button.disabled = true;
      document.body.appendChild(button);

      await button.updateComplete;

      let eventFired = false;
      button.addEventListener('button-click', () => {
        eventFired = true;
      });

      const buttonElement = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      buttonElement.click();

      // Wait a bit to ensure event doesn't fire
      setTimeout(() => {
        assert.ok(!eventFired, 'button-click event should not be fired when disabled');
        document.body.removeChild(button);
        done();
      }, 10);
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });
});
