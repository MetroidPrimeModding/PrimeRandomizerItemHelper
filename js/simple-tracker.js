'use strict';

class ItemCounterElement extends HTMLElement {
    connectedCallback() {
        this.addEventListener('click', event => {
            this.incrementCount();
            event.preventDefault();
        });
        this.addEventListener('contextmenu', event => {
            this.decrementCount();
            event.preventDefault();
        });
        this.count = 0;
    }

    get max() {
        return Number(this.getAttribute('max') || '1');
    }

    get increment() {
        return Number(this.getAttribute('increment') || '1');
    }

    get count() {
        return Number(this.getAttribute('count') || '0');
    }

    get item() {
        return String(this.getAttribute('item'));
    }

    set count(value) {
        let num = Number(value);
        if (num > this.max) {
            num = this.max;
        }
        if (num < 0) {
            num = 0;
        }
        this.setAttribute('count', String(num));
        let countSpan = this.querySelector('[counter]');
        if (countSpan) {
            countSpan.innerHTML = `${num}/${this.max}`;
        }
        let toggler = document.querySelector(`item-toggle[item=${this.item}]`);
        if (toggler) {
            toggler.setAttribute('count', String(num));
        }
    }

    incrementCount() {
        if (this.max === 1 && this.count === 1) {
            this.count = 0;
        } else {
            this.count += this.increment;
        }
    }

    decrementCount() {
        this.count -= this.increment;
    }
}

class ItemToggleElement extends HTMLElement {
    connectedCallback() {
        this.setAttribute('count', '0');
        
        this.addEventListener('click', event => {
            let item = document.querySelector(`item-counter[item=${this.item}]`);
            item.incrementCount();
            event.preventDefault();
        });
        this.addEventListener('contextmenu', event => {
            let item = document.querySelector(`item-counter[item=${this.item}]`);
            item.decrementCount();
            event.preventDefault();
        });
    }

    get item() {
        return String(this.getAttribute('item'));
    }
}

class NewTabLinkElement extends HTMLElement {
    connectedCallback() {
      this.addEventListener('click', event => {
        window.open(window.location.href, 'Prime Item Tracker', 'resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, width=400, height=610');
      });
    }
}

customElements.define('item-counter', ItemCounterElement);
customElements.define('item-toggle', ItemToggleElement);
customElements.define('newtab-link', NewTabLinkElement);
