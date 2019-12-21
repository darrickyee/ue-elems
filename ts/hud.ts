/// <reference path="../res/script/ue4.d.ts" />
import shft from 'shftjs';
import GAMESTATE from './lib/data';
import { select, listen, getprop } from './lib/util';

const ready = fn => {
    if (document.readyState !== 'loading') {
        // Document is already ready, call the callback directly
        fn();
    }
    // All modern browsers to register DOMContentLoaded
    else document.addEventListener('DOMContentLoaded', fn, { once: true });
};

function init() {
    // initPy(window.process);
    ue4('UiLoaded');

    type Action = {
        type: string;
    } & { [k: string]: any };

    const btngrp: any = select('ue-button-grp');
    btngrp.buttons = [{ label: 'clickme' }, { label: 'Another button' }, { label: 'Third button' }];

    const slidergrp: any = select('ue-slider-grp');
    slidergrp.name = 'My slider group';
    slidergrp.data = [{ label: 'slider 1' }, { label: 'slider 2' }, { label: 'Rotation x' }];

    function Update(action: Action) {
        GAMESTATE.dispatch(action);
    }

    Object.assign(ue.interface, { Update });
    Object.assign(window, { shft, Update, listen, getprop, select });
}

ready(init);
