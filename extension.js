const Main = imports.ui.main;

function NoA11yExtension() {
    this._init()
}


NoA11yExtension.prototype = {
    _init: function() {
        this._index = -1;
        this._removed = 0;

        let list = Main.panel._status_area_order;
        for (let i = 0; i < list.length; i++) {
            if (list[i] == 'a11y') {
               this._index = i;
               break;
            }
        }
    },

    enable: function() {
        if (this._index == -1 || this._removed == 1) return;
        
        let children = Main.panel._rightBox.get_children();
        for (let i = 0; i < children.length; i++) {
            if (children[i]._rolePosition == this._index) {
                children[i].destroy();
                this._removed = 1;
                break;
            }
        }
    },

    disable: function() {
        if (this._index == -1 || this._removed == 0) return;

        let role = Main.panel._status_area_order[this._index];
        let constructor = Main.panel._status_area_shell_implementation[role];
        if (constructor != null ) {
            Main.panel._statusArea[role] = null;
            let indicator = new constructor();
            Main.panel.addToStatusArea(role, indicator, this._index);
            this._removed = 0;
        }
    }
};


function init() {
    return new NoA11yExtension(); 
}
