import { lit, html } from '../lib/lit';
import { reflect } from '../lib/util';
import { define, parent } from 'hybrids';
import { Item, ItemGroup } from './ue-items';

// const UeMenu = {
//     items: host => [...host.children],
//     selected: reflect('selected', 0),
//     render: lit(
//         () => html`<style>
//                 :host {
//                     border: 2px solid black;
//                 }</style
//             ><slot name="selected-item"></slot>`
//     ),
// };

// const UeMenuItem = {
//     ...Item,
//     label: host => host.innerText,
//     container: parent(UeMenu as any),
//     slotContent: (host: HTMLElement) => host.shadowRoot && host.sha,
// };
