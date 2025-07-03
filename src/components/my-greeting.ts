import { html, css } from 'lit';
import { MobxLitElement } from '@adobe/lit-mobx';
import { customElement, property } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { studioAppContext } from '../studio-app-context';
import { StudioAppProxy } from '../StudioAppProxy';

@customElement('my-greeting')
export class MyGreeting extends MobxLitElement {
  static styles = css`
        :host {
            display: block;
            padding: 16px;
            margin: 16px 0;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .greeting {
            text-align: center;
        }

        h3 {
            margin-top: 0;
        }

        .message {
            font-size: 1.5em;
            margin: 16px 0;
        }

        input {
            padding: 8px;
            border: none;
            border-radius: 4px;
            margin: 8px;
            font-size: 16px;
        }

        .time {
            font-size: 0.9em;
            opacity: 0.8;
            margin-top: 16px;
        }
    `;

  @consume({ context: studioAppContext })
  studioApp: StudioAppProxy | undefined;

  @property({ type: String })
  name = 'World';

  @property({ type: String })
  greeting = 'Hello';

  private _updateName(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (this.studioApp) {
      this.studioApp.changeOwner(input.value);
    }
  }

  private _getTimeBasedGreeting(): String {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  render() {
    const timeGreeting = this._getTimeBasedGreeting();
    const owner = this.studioApp ? this.studioApp.owner : this.name;

    return html`
            <div class="greeting">
                <h3>Greeting Component</h3>
                <div class="message">${this.greeting}, ${owner}</div>
                <div class="time">${timeGreeting}</div>
                <div>
                    <input
                        type="text"
                        .value=${this.studioApp ? this.studioApp.owner : this.name}
                        @input=${this._updateName}
                        placeholder="Enter your name"
                    />
                </div>
            </div>
        `;
  }
}
