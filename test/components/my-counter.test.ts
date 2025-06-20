import { MyCounter } from '../../src/components/my-counter';

// Make sure the component is defined
import '../../src/components/my-counter';

QUnit.module('MyCounter Component', function () {

  QUnit.test('should create counter with default count of 0', function (assert) {
    const counter = new MyCounter();
    assert.equal(counter.count, 0, 'Default count should be 0');
  });

  QUnit.test('should create counter with initial count from property', function (assert) {
    const counter = new MyCounter();
    counter.count = 5;
    assert.equal(counter.count, 5, 'Count should be set to 5');
  });

  QUnit.test('should render counter display', async function (assert) {
    const done = assert.async();

    try {
      // Create element directly
      const counter = document.createElement('my-counter') as MyCounter;
      counter.count = 10;
      document.body.appendChild(counter);

      // Wait for the element to render
      await counter.updateComplete;

      const display = counter.shadowRoot?.querySelector('.count-display');
      assert.ok(display, 'Count display should exist');
      assert.ok(display?.textContent?.includes('10'), 'Display should show count value');

      // Clean up
      document.body.removeChild(counter);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });

  QUnit.test('should have increment, decrement, and reset buttons', async function (assert) {
    const done = assert.async();

    try {
      const counter = document.createElement('my-counter') as MyCounter;
      document.body.appendChild(counter);

      await counter.updateComplete;

      const buttons = counter.shadowRoot?.querySelectorAll('button');
      assert.equal(buttons?.length, 3, 'Should have 3 buttons');

      const incrementBtn = counter.shadowRoot?.querySelector('.increment');
      const decrementBtn = counter.shadowRoot?.querySelector('.decrement');
      const resetBtn = counter.shadowRoot?.querySelector('.reset');

      assert.ok(incrementBtn, 'Increment button should exist');
      assert.ok(decrementBtn, 'Decrement button should exist');
      assert.ok(resetBtn, 'Reset button should exist');

      document.body.removeChild(counter);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });

  QUnit.test('should increment count when increment button is clicked', async function (assert) {
    const done = assert.async();

    try {
      const counter = document.createElement('my-counter') as MyCounter;
      counter.count = 5;
      document.body.appendChild(counter);

      await counter.updateComplete;

      const incrementBtn = counter.shadowRoot?.querySelector('.increment') as HTMLButtonElement;

      // Listen for the custom event
      let eventFired = false;
      counter.addEventListener('count-changed', (e: any) => {
        eventFired = true;
        assert.equal(e.detail.count, 6, 'Event should contain new count value');
      });

      incrementBtn.click();

      assert.equal(counter.count, 6, 'Count should be incremented to 6');
      assert.ok(eventFired, 'count-changed event should be fired');

      document.body.removeChild(counter);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });

  QUnit.test('should reset count to 0 when reset button is clicked', async function (assert) {
    const done = assert.async();

    try {
      const counter = document.createElement('my-counter') as MyCounter;
      counter.count = 10;
      document.body.appendChild(counter);

      await counter.updateComplete;

      const resetBtn = counter.shadowRoot?.querySelector('.reset') as HTMLButtonElement;
      resetBtn.click();

      assert.equal(counter.count, 0, 'Count should be reset to 0');

      document.body.removeChild(counter);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });
});
