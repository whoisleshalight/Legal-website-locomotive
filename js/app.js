(() => {
    "use strict";
    var __webpack_require__ = {};
    (() => {
        __webpack_require__.g = function() {
            if (typeof globalThis === "object") return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if (typeof window === "object") return window;
            }
        }();
    })();
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    class Popup {
        constructor(options) {
            let config = {
                logging: true,
                init: true,
                attributeOpenButton: "data-popup",
                attributeCloseButton: "data-close",
                fixElementSelector: "[data-lp]",
                youtubeAttribute: "data-popup-youtube",
                youtubePlaceAttribute: "data-popup-youtube-place",
                setAutoplayYoutube: true,
                classes: {
                    popup: "popup",
                    popupContent: "popup__content",
                    popupActive: "popup_show",
                    bodyActive: "popup-show"
                },
                focusCatch: true,
                closeEsc: true,
                bodyLock: true,
                hashSettings: {
                    location: true,
                    goHash: true
                },
                on: {
                    beforeOpen: function() {},
                    afterOpen: function() {},
                    beforeClose: function() {},
                    afterClose: function() {}
                }
            };
            this.youTubeCode;
            this.isOpen = false;
            this.targetOpen = {
                selector: false,
                element: false
            };
            this.previousOpen = {
                selector: false,
                element: false
            };
            this.lastClosed = {
                selector: false,
                element: false
            };
            this._dataValue = false;
            this.hash = false;
            this._reopen = false;
            this._selectorOpen = false;
            this.lastFocusEl = false;
            this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
            this.options = {
                ...config,
                ...options,
                classes: {
                    ...config.classes,
                    ...options?.classes
                },
                hashSettings: {
                    ...config.hashSettings,
                    ...options?.hashSettings
                },
                on: {
                    ...config.on,
                    ...options?.on
                }
            };
            this.bodyLock = false;
            this.options.init ? this.initPopups() : null;
        }
        initPopups() {
            this.popupLogging(`Прокинувся`);
            this.eventsPopup();
        }
        eventsPopup() {
            document.addEventListener("click", function(e) {
                const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                if (buttonOpen) {
                    e.preventDefault();
                    this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                    this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                    if (this._dataValue !== "error") {
                        if (!this.isOpen) this.lastFocusEl = buttonOpen;
                        this.targetOpen.selector = `${this._dataValue}`;
                        this._selectorOpen = true;
                        this.open();
                        return;
                    } else this.popupLogging(`Йой, не заповнено атрибут у ${buttonOpen.classList}`);
                    return;
                }
                const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                if (this.options.closeEsc && e.which == 27 && e.code === "Escape" && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
                if (this.options.focusCatch && e.which == 9 && this.isOpen) {
                    this._focusCatch(e);
                    return;
                }
            }.bind(this));
            if (this.options.hashSettings.goHash) {
                window.addEventListener("hashchange", function() {
                    if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                }.bind(this));
                window.addEventListener("load", function() {
                    if (window.location.hash) ;
                }.bind(this));
            }
        }
        open(selectorValue) {
            if (bodyLockStatus) {
                this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
                if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") {
                    this.targetOpen.selector = selectorValue;
                    this._selectorOpen = true;
                }
                if (this.isOpen) {
                    this._reopen = true;
                    this.close();
                }
                if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                if (!this._reopen) this.previousActiveElement = document.activeElement;
                this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                if (this.targetOpen.element) {
                    if (this.youTubeCode) {
                        const codeVideo = this.youTubeCode;
                        const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                        const iframe = document.createElement("iframe");
                        iframe.setAttribute("allowfullscreen", "");
                        const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                        iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                        iframe.setAttribute("src", urlVideo);
                        if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                        }
                        this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                    }
                    if (this.options.hashSettings.location) {
                        this._getHash();
                        this._setHash();
                    }
                    this.options.on.beforeOpen(this);
                    document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.targetOpen.element.classList.add(this.options.classes.popupActive);
                    document.documentElement.classList.add(this.options.classes.bodyActive);
                    if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                    this.targetOpen.element.setAttribute("aria-hidden", "false");
                    this.previousOpen.selector = this.targetOpen.selector;
                    this.previousOpen.element = this.targetOpen.element;
                    this._selectorOpen = false;
                    this.isOpen = true;
                    setTimeout((() => {
                        this._focusTrap();
                    }), 50);
                    this.options.on.afterOpen(this);
                    document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.popupLogging(`Відкрив попап`);
                } else this.popupLogging(`Йой, такого попапу немає. Перевірте коректність введення. `);
            }
        }
        close(selectorValue) {
            if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") this.previousOpen.selector = selectorValue;
            if (!this.isOpen || !bodyLockStatus) return;
            this.options.on.beforeClose(this);
            document.dispatchEvent(new CustomEvent("beforePopupClose", {
                detail: {
                    popup: this
                }
            }));
            if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
            this.previousOpen.element.classList.remove(this.options.classes.popupActive);
            this.previousOpen.element.setAttribute("aria-hidden", "true");
            if (!this._reopen) {
                document.documentElement.classList.remove(this.options.classes.bodyActive);
                !this.bodyLock ? bodyUnlock() : null;
                this.isOpen = false;
            }
            this._removeHash();
            if (this._selectorOpen) {
                this.lastClosed.selector = this.previousOpen.selector;
                this.lastClosed.element = this.previousOpen.element;
            }
            this.options.on.afterClose(this);
            document.dispatchEvent(new CustomEvent("afterPopupClose", {
                detail: {
                    popup: this
                }
            }));
            setTimeout((() => {
                this._focusTrap();
            }), 50);
            this.popupLogging(`Закрив попап`);
        }
        _getHash() {
            if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
        }
        _setHash() {
            history.pushState("", "", this.hash);
        }
        _removeHash() {
            history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
            const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);
            if (e.shiftKey && focusedIndex === 0) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }
            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }
        _focusTrap() {
            const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
            if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
        }
        popupLogging(message) {
            this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
        }
    }
    modules_flsModules.popup = new Popup({});
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if (formRequiredItem.dataset.required === "email") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll(".select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    class SelectConstructor {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true,
                speed: 150
            };
            this.config = Object.assign(defaultConfig, props);
            this.selectClasses = {
                classSelect: "select",
                classSelectBody: "select__body",
                classSelectTitle: "select__title",
                classSelectValue: "select__value _icon-arrow-light",
                classSelectLabel: "select__label",
                classSelectInput: "select__input",
                classSelectText: "select__text",
                classSelectLink: "select__link",
                classSelectOptions: "select__options",
                classSelectOptionsScroll: "select__scroll",
                classSelectOption: "select__option",
                classSelectContent: "select__content",
                classSelectRow: "select__row",
                classSelectData: "select__asset",
                classSelectDisabled: "_select-disabled",
                classSelectTag: "_select-tag",
                classSelectOpen: "_select-open",
                classSelectActive: "_select-active",
                classSelectFocus: "_select-focus",
                classSelectMultiple: "_select-multiple",
                classSelectCheckBox: "_select-checkbox",
                classSelectOptionSelected: "_select-selected",
                classSelectPseudoLabel: "_select-pseudo-label"
            };
            this._this = this;
            if (this.config.init) {
                const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
                if (selectItems.length) {
                    this.selectsInit(selectItems);
                    this.setLogging(`Прокинувся, построїв селектов: (${selectItems.length})`);
                } else this.setLogging("Сплю, немає жодного select");
            }
        }
        getSelectClass(className) {
            return `.${className}`;
        }
        getSelectElement(selectItem, className) {
            return {
                originalSelect: selectItem.querySelector("select"),
                selectElement: selectItem.querySelector(this.getSelectClass(className))
            };
        }
        selectsInit(selectItems) {
            selectItems.forEach(((originalSelect, index) => {
                this.selectInit(originalSelect, index + 1);
            }));
            document.addEventListener("click", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusin", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusout", function(e) {
                this.selectsActions(e);
            }.bind(this));
        }
        selectInit(originalSelect, index) {
            const _this = this;
            let selectItem = document.createElement("div");
            selectItem.classList.add(this.selectClasses.classSelect);
            originalSelect.parentNode.insertBefore(selectItem, originalSelect);
            selectItem.appendChild(originalSelect);
            originalSelect.hidden = true;
            index ? originalSelect.dataset.id = index : null;
            if (this.getSelectPlaceholder(originalSelect)) {
                originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
                if (this.getSelectPlaceholder(originalSelect).label.show) {
                    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                    selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
                }
            }
            selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
            this.selectBuild(originalSelect);
            originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
            this.config.speed = +originalSelect.dataset.speed;
            originalSelect.addEventListener("change", (function(e) {
                _this.selectChange(e);
            }));
        }
        selectBuild(originalSelect) {
            const selectItem = originalSelect.parentElement;
            selectItem.dataset.id = originalSelect.dataset.id;
            originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
            originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
            originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setOptions(selectItem, originalSelect);
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
            originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
            this.selectDisabled(selectItem, originalSelect);
        }
        selectsActions(e) {
            const targetElement = e.target;
            const targetType = e.type;
            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                if (targetType === "click") {
                    if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                        const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                        const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                        this.optionAction(selectItem, originalSelect, optionItem);
                    } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                        const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                        this.optionAction(selectItem, originalSelect, optionItem);
                    }
                } else if (targetType === "focusin" || targetType === "focusout") {
                    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) targetType === "focusin" ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                } else if (targetType === "keydown" && e.code === "Escape") this.selectsСlose();
            } else this.selectsСlose();
        }
        selectsСlose(selectOneGroup) {
            const selectsGroup = selectOneGroup ? selectOneGroup : document;
            const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
            if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
                this.selectСlose(selectActiveItem);
            }));
        }
        selectСlose(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.remove(this.selectClasses.classSelectOpen);
                _slideUp(selectOptions, originalSelect.dataset.speed);
                setTimeout((() => {
                    selectItem.style.zIndex = "";
                }), originalSelect.dataset.speed);
            }
        }
        selectAction(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;
            this.setOptionsPosition(selectItem);
            if (originalSelect.closest("[data-one-select]")) {
                const selectOneGroup = originalSelect.closest("[data-one-select]");
                this.selectsСlose(selectOneGroup);
            }
            setTimeout((() => {
                if (!selectOptions.classList.contains("_slide")) {
                    selectItem.classList.toggle(this.selectClasses.classSelectOpen);
                    _slideToggle(selectOptions, originalSelect.dataset.speed);
                    if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) selectItem.style.zIndex = selectOpenzIndex; else setTimeout((() => {
                        selectItem.style.zIndex = "";
                    }), originalSelect.dataset.speed);
                }
            }), 0);
        }
        setSelectTitleValue(selectItem, originalSelect) {
            const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
            const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
            if (selectItemTitle) selectItemTitle.remove();
            selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
        }
        getSelectTitleValue(selectItem, originalSelect) {
            let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
            if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
                if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
                    document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
                    if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
                }
            }
            selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
            let pseudoAttribute = "";
            let pseudoAttributeClass = "";
            if (originalSelect.hasAttribute("data-pseudo-label")) {
                pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
                pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
            }
            this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
            if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`; else {
                const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
                return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
            }
        }
        getSelectElementContent(selectOption) {
            const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
            const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
            let selectOptionContentHTML = ``;
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
            selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
            selectOptionContentHTML += selectOption.textContent;
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            return selectOptionContentHTML;
        }
        getSelectPlaceholder(originalSelect) {
            const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
            if (selectPlaceholder) return {
                value: selectPlaceholder.textContent,
                show: selectPlaceholder.hasAttribute("data-show"),
                label: {
                    show: selectPlaceholder.hasAttribute("data-label"),
                    text: selectPlaceholder.dataset.label
                }
            };
        }
        getSelectedOptionsData(originalSelect, type) {
            let selectedOptions = [];
            if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
            return {
                elements: selectedOptions.map((option => option)),
                values: selectedOptions.filter((option => option.value)).map((option => option.value)),
                html: selectedOptions.map((option => this.getSelectElementContent(option)))
            };
        }
        getOptions(originalSelect) {
            const selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
            const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
            let selectOptions = Array.from(originalSelect.options);
            if (selectOptions.length > 0) {
                let selectOptionsHTML = ``;
                if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
                selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ""} class="${this.selectClasses.classSelectOptionsScroll}">`;
                selectOptions.forEach((selectOption => {
                    selectOptionsHTML += this.getOption(selectOption, originalSelect);
                }));
                selectOptionsHTML += `</div>`;
                return selectOptionsHTML;
            }
        }
        getOption(selectOption, originalSelect) {
            const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
            const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
            const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
            const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
            const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
            let selectOptionHTML = ``;
            selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
            selectOptionHTML += this.getSelectElementContent(selectOption);
            selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
            return selectOptionHTML;
        }
        setOptions(selectItem, originalSelect) {
            const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            selectItemOptions.innerHTML = this.getOptions(originalSelect);
        }
        setOptionsPosition(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
            const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
            const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;
            if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
                selectOptions.hidden = false;
                const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue("max-height"));
                const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
                const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
                selectOptions.hidden = true;
                const selectItemHeight = selectItem.offsetHeight;
                const selectItemPos = selectItem.getBoundingClientRect().top;
                const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
                const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);
                if (selectItemResult < 0) {
                    const newMaxHeightValue = selectOptionsHeight + selectItemResult;
                    if (newMaxHeightValue < 100) {
                        selectItem.classList.add("select--show-top");
                        selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
                    } else {
                        selectItem.classList.remove("select--show-top");
                        selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
                    }
                }
            } else setTimeout((() => {
                selectItem.classList.remove("select--show-top");
                selectItemScroll.style.maxHeight = customMaxHeightValue;
            }), +originalSelect.dataset.speed);
        }
        optionAction(selectItem, originalSelect, optionItem) {
            const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
            if (!selectOptions.classList.contains("_slide")) {
                if (originalSelect.multiple) {
                    optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
                    const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                    originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
                        originalSelectSelectedItem.removeAttribute("selected");
                    }));
                    const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                    selectSelectedItems.forEach((selectSelectedItems => {
                        originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
                    }));
                } else {
                    if (!originalSelect.hasAttribute("data-show-selected")) setTimeout((() => {
                        if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                        optionItem.hidden = true;
                    }), this.config.speed);
                    originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
                    this.selectAction(selectItem);
                }
                this.setSelectTitleValue(selectItem, originalSelect);
                this.setSelectChange(originalSelect);
            }
        }
        selectChange(e) {
            const originalSelect = e.target;
            this.selectBuild(originalSelect);
            this.setSelectChange(originalSelect);
        }
        setSelectChange(originalSelect) {
            if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
            if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
                let tempButton = document.createElement("button");
                tempButton.type = "submit";
                originalSelect.closest("form").append(tempButton);
                tempButton.click();
                tempButton.remove();
            }
            const selectItem = originalSelect.parentElement;
            this.selectCallback(selectItem, originalSelect);
        }
        selectDisabled(selectItem, originalSelect) {
            if (originalSelect.disabled) {
                selectItem.classList.add(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
            } else {
                selectItem.classList.remove(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
            }
        }
        searchActions(selectItem) {
            this.getSelectElement(selectItem).originalSelect;
            const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
            const _this = this;
            selectInput.addEventListener("input", (function() {
                selectOptionsItems.forEach((selectOptionsItem => {
                    if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
                }));
                selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
            }));
        }
        selectCallback(selectItem, originalSelect) {
            document.dispatchEvent(new CustomEvent("selectCallback", {
                detail: {
                    select: originalSelect
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[select]: ${message} `) : null;
        }
    }
    modules_flsModules.select = new SelectConstructor({});
    function ssr_window_esm_isObject(obj) {
        return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
    }
    function extend(target, src) {
        if (target === void 0) target = {};
        if (src === void 0) src = {};
        Object.keys(src).forEach((key => {
            if (typeof target[key] === "undefined") target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
        }));
    }
    const ssrDocument = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        getElementById() {
            return null;
        },
        createEvent() {
            return {
                initEvent() {}
            };
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName() {
                    return [];
                }
            };
        },
        createElementNS() {
            return {};
        },
        importNode() {
            return null;
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function ssr_window_esm_getDocument() {
        const doc = typeof document !== "undefined" ? document : {};
        extend(doc, ssrDocument);
        return doc;
    }
    const ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return "";
                }
            };
        },
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia() {
            return {};
        },
        requestAnimationFrame(callback) {
            if (typeof setTimeout === "undefined") {
                callback();
                return null;
            }
            return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
            if (typeof setTimeout === "undefined") return;
            clearTimeout(id);
        }
    };
    function ssr_window_esm_getWindow() {
        const win = typeof window !== "undefined" ? window : {};
        extend(win, ssrWindow);
        return win;
    }
    function utils_classesToTokens(classes) {
        if (classes === void 0) classes = "";
        return classes.trim().split(" ").filter((c => !!c.trim()));
    }
    function deleteProps(obj) {
        const object = obj;
        Object.keys(object).forEach((key => {
            try {
                object[key] = null;
            } catch (e) {}
            try {
                delete object[key];
            } catch (e) {}
        }));
    }
    function utils_nextTick(callback, delay) {
        if (delay === void 0) delay = 0;
        return setTimeout(callback, delay);
    }
    function utils_now() {
        return Date.now();
    }
    function utils_getComputedStyle(el) {
        const window = ssr_window_esm_getWindow();
        let style;
        if (window.getComputedStyle) style = window.getComputedStyle(el, null);
        if (!style && el.currentStyle) style = el.currentStyle;
        if (!style) style = el.style;
        return style;
    }
    function utils_getTranslate(el, axis) {
        if (axis === void 0) axis = "x";
        const window = ssr_window_esm_getWindow();
        let matrix;
        let curTransform;
        let transformMatrix;
        const curStyle = utils_getComputedStyle(el);
        if (window.WebKitCSSMatrix) {
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
            transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
        } else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
            matrix = transformMatrix.toString().split(",");
        }
        if (axis === "x") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
        if (axis === "y") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
        return curTransform || 0;
    }
    function utils_isObject(o) {
        return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
    }
    function isNode(node) {
        if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") return node instanceof HTMLElement;
        return node && (node.nodeType === 1 || node.nodeType === 11);
    }
    function utils_extend() {
        const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
        const noExtend = [ "__proto__", "constructor", "prototype" ];
        for (let i = 1; i < arguments.length; i += 1) {
            const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
            if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
                const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== void 0 && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                        to[nextKey] = {};
                        if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                    } else to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
    function utils_setCSSProperty(el, varName, varValue) {
        el.style.setProperty(varName, varValue);
    }
    function animateCSSModeScroll(_ref) {
        let {swiper, targetPosition, side} = _ref;
        const window = ssr_window_esm_getWindow();
        const startPosition = -swiper.translate;
        let startTime = null;
        let time;
        const duration = swiper.params.speed;
        swiper.wrapperEl.style.scrollSnapType = "none";
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        const dir = targetPosition > startPosition ? "next" : "prev";
        const isOutOfBound = (current, target) => dir === "next" && current >= target || dir === "prev" && current <= target;
        const animate = () => {
            time = (new Date).getTime();
            if (startTime === null) startTime = time;
            const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
            const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
            let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
            if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
            swiper.wrapperEl.scrollTo({
                [side]: currentPosition
            });
            if (isOutOfBound(currentPosition, targetPosition)) {
                swiper.wrapperEl.style.overflow = "hidden";
                swiper.wrapperEl.style.scrollSnapType = "";
                setTimeout((() => {
                    swiper.wrapperEl.style.overflow = "";
                    swiper.wrapperEl.scrollTo({
                        [side]: currentPosition
                    });
                }));
                window.cancelAnimationFrame(swiper.cssModeFrameID);
                return;
            }
            swiper.cssModeFrameID = window.requestAnimationFrame(animate);
        };
        animate();
    }
    function utils_getSlideTransformEl(slideEl) {
        return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowRoot && slideEl.shadowRoot.querySelector(".swiper-slide-transform") || slideEl;
    }
    function utils_elementChildren(element, selector) {
        if (selector === void 0) selector = "";
        return [ ...element.children ].filter((el => el.matches(selector)));
    }
    function showWarning(text) {
        try {
            console.warn(text);
            return;
        } catch (err) {}
    }
    function utils_createElement(tag, classes) {
        if (classes === void 0) classes = [];
        const el = document.createElement(tag);
        el.classList.add(...Array.isArray(classes) ? classes : utils_classesToTokens(classes));
        return el;
    }
    function elementPrevAll(el, selector) {
        const prevEls = [];
        while (el.previousElementSibling) {
            const prev = el.previousElementSibling;
            if (selector) {
                if (prev.matches(selector)) prevEls.push(prev);
            } else prevEls.push(prev);
            el = prev;
        }
        return prevEls;
    }
    function elementNextAll(el, selector) {
        const nextEls = [];
        while (el.nextElementSibling) {
            const next = el.nextElementSibling;
            if (selector) {
                if (next.matches(selector)) nextEls.push(next);
            } else nextEls.push(next);
            el = next;
        }
        return nextEls;
    }
    function elementStyle(el, prop) {
        const window = ssr_window_esm_getWindow();
        return window.getComputedStyle(el, null).getPropertyValue(prop);
    }
    function utils_elementIndex(el) {
        let child = el;
        let i;
        if (child) {
            i = 0;
            while ((child = child.previousSibling) !== null) if (child.nodeType === 1) i += 1;
            return i;
        }
        return;
    }
    function utils_elementParents(el, selector) {
        const parents = [];
        let parent = el.parentElement;
        while (parent) {
            if (selector) {
                if (parent.matches(selector)) parents.push(parent);
            } else parents.push(parent);
            parent = parent.parentElement;
        }
        return parents;
    }
    function utils_elementTransitionEnd(el, callback) {
        function fireCallBack(e) {
            if (e.target !== el) return;
            callback.call(el, e);
            el.removeEventListener("transitionend", fireCallBack);
        }
        if (callback) el.addEventListener("transitionend", fireCallBack);
    }
    function utils_elementOuterSize(el, size, includeMargins) {
        const window = ssr_window_esm_getWindow();
        if (includeMargins) return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
        return el.offsetWidth;
    }
    let support;
    function calcSupport() {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        return {
            smoothScroll: document.documentElement && document.documentElement.style && "scrollBehavior" in document.documentElement.style,
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
    }
    function getSupport() {
        if (!support) support = calcSupport();
        return support;
    }
    let deviceCached;
    function calcDevice(_temp) {
        let {userAgent} = _temp === void 0 ? {} : _temp;
        const support = getSupport();
        const window = ssr_window_esm_getWindow();
        const platform = window.navigator.platform;
        const ua = userAgent || window.navigator.userAgent;
        const device = {
            ios: false,
            android: false
        };
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        const windows = platform === "Win32";
        let macos = platform === "MacIntel";
        const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
        if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
            ipad = ua.match(/(Version)\/([\d.]+)/);
            if (!ipad) ipad = [ 0, 1, "13_0_0" ];
            macos = false;
        }
        if (android && !windows) {
            device.os = "android";
            device.android = true;
        }
        if (ipad || iphone || ipod) {
            device.os = "ios";
            device.ios = true;
        }
        return device;
    }
    function getDevice(overrides) {
        if (overrides === void 0) overrides = {};
        if (!deviceCached) deviceCached = calcDevice(overrides);
        return deviceCached;
    }
    let browser;
    function calcBrowser() {
        const window = ssr_window_esm_getWindow();
        let needPerspectiveFix = false;
        function isSafari() {
            const ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
        }
        if (isSafari()) {
            const ua = String(window.navigator.userAgent);
            if (ua.includes("Version/")) {
                const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num => Number(num)));
                needPerspectiveFix = major < 16 || major === 16 && minor < 2;
            }
        }
        return {
            isSafari: needPerspectiveFix || isSafari(),
            needPerspectiveFix,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
        };
    }
    function getBrowser() {
        if (!browser) browser = calcBrowser();
        return browser;
    }
    function Resize(_ref) {
        let {swiper, on, emit} = _ref;
        const window = ssr_window_esm_getWindow();
        let observer = null;
        let animationFrame = null;
        const resizeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("beforeResize");
            emit("resize");
        };
        const createObserver = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            observer = new ResizeObserver((entries => {
                animationFrame = window.requestAnimationFrame((() => {
                    const {width, height} = swiper;
                    let newWidth = width;
                    let newHeight = height;
                    entries.forEach((_ref2 => {
                        let {contentBoxSize, contentRect, target} = _ref2;
                        if (target && target !== swiper.el) return;
                        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                    }));
                    if (newWidth !== width || newHeight !== height) resizeHandler();
                }));
            }));
            observer.observe(swiper.el);
        };
        const removeObserver = () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            if (observer && observer.unobserve && swiper.el) {
                observer.unobserve(swiper.el);
                observer = null;
            }
        };
        const orientationChangeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("orientationchange");
        };
        on("init", (() => {
            if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
                createObserver();
                return;
            }
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("orientationchange", orientationChangeHandler);
        }));
        on("destroy", (() => {
            removeObserver();
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", orientationChangeHandler);
        }));
    }
    function Observer(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const observers = [];
        const window = ssr_window_esm_getWindow();
        const attach = function(target, options) {
            if (options === void 0) options = {};
            const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            const observer = new ObserverFunc((mutations => {
                if (swiper.__preventObserver__) return;
                if (mutations.length === 1) {
                    emit("observerUpdate", mutations[0]);
                    return;
                }
                const observerUpdate = function observerUpdate() {
                    emit("observerUpdate", mutations[0]);
                };
                if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
            }));
            observer.observe(target, {
                attributes: typeof options.attributes === "undefined" ? true : options.attributes,
                childList: typeof options.childList === "undefined" ? true : options.childList,
                characterData: typeof options.characterData === "undefined" ? true : options.characterData
            });
            observers.push(observer);
        };
        const init = () => {
            if (!swiper.params.observer) return;
            if (swiper.params.observeParents) {
                const containerParents = utils_elementParents(swiper.hostEl);
                for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
            }
            attach(swiper.hostEl, {
                childList: swiper.params.observeSlideChildren
            });
            attach(swiper.wrapperEl, {
                attributes: false
            });
        };
        const destroy = () => {
            observers.forEach((observer => {
                observer.disconnect();
            }));
            observers.splice(0, observers.length);
        };
        extendParams({
            observer: false,
            observeParents: false,
            observeSlideChildren: false
        });
        on("init", init);
        on("destroy", destroy);
    }
    var eventsEmitter = {
        on(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            events.split(" ").forEach((event => {
                if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                self.eventsListeners[event][method](handler);
            }));
            return self;
        },
        once(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            function onceHandler() {
                self.off(events, onceHandler);
                if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                handler.apply(self, args);
            }
            onceHandler.__emitterProxy = handler;
            return self.on(events, onceHandler, priority);
        },
        onAny(handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
            return self;
        },
        offAny(handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsAnyListeners) return self;
            const index = self.eventsAnyListeners.indexOf(handler);
            if (index >= 0) self.eventsAnyListeners.splice(index, 1);
            return self;
        },
        off(events, handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            events.split(" ").forEach((event => {
                if (typeof handler === "undefined") self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                    if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                }));
            }));
            return self;
        },
        emit() {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            let events;
            let data;
            let context;
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
            if (typeof args[0] === "string" || Array.isArray(args[0])) {
                events = args[0];
                data = args.slice(1, args.length);
                context = self;
            } else {
                events = args[0].events;
                data = args[0].data;
                context = args[0].context || self;
            }
            data.unshift(context);
            const eventsArray = Array.isArray(events) ? events : events.split(" ");
            eventsArray.forEach((event => {
                if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                    eventHandler.apply(context, [ event, ...data ]);
                }));
                if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                    eventHandler.apply(context, data);
                }));
            }));
            return self;
        }
    };
    function updateSize() {
        const swiper = this;
        let width;
        let height;
        const el = swiper.el;
        if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) width = swiper.params.width; else width = el.clientWidth;
        if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) height = swiper.params.height; else height = el.clientHeight;
        if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) return;
        width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
        height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
        if (Number.isNaN(width)) width = 0;
        if (Number.isNaN(height)) height = 0;
        Object.assign(swiper, {
            width,
            height,
            size: swiper.isHorizontal() ? width : height
        });
    }
    function updateSlides() {
        const swiper = this;
        function getDirectionPropertyValue(node, label) {
            return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
        }
        const params = swiper.params;
        const {wrapperEl, slidesEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        const slides = utils_elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
        const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        let snapGrid = [];
        const slidesGrid = [];
        const slidesSizesGrid = [];
        let offsetBefore = params.slidesOffsetBefore;
        if (typeof offsetBefore === "function") offsetBefore = params.slidesOffsetBefore.call(swiper);
        let offsetAfter = params.slidesOffsetAfter;
        if (typeof offsetAfter === "function") offsetAfter = params.slidesOffsetAfter.call(swiper);
        const previousSnapGridLength = swiper.snapGrid.length;
        const previousSlidesGridLength = swiper.slidesGrid.length;
        let spaceBetween = params.spaceBetween;
        let slidePosition = -offsetBefore;
        let prevSlideSize = 0;
        let index = 0;
        if (typeof swiperSize === "undefined") return;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        swiper.virtualSize = -spaceBetween;
        slides.forEach((slideEl => {
            if (rtl) slideEl.style.marginLeft = ""; else slideEl.style.marginRight = "";
            slideEl.style.marginBottom = "";
            slideEl.style.marginTop = "";
        }));
        if (params.centeredSlides && params.cssMode) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
        }
        const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
        if (gridEnabled) swiper.grid.initSlides(slides); else if (swiper.grid) swiper.grid.unsetSlides();
        let slideSize;
        const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key => typeof params.breakpoints[key].slidesPerView !== "undefined")).length > 0;
        for (let i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            let slide;
            if (slides[i]) slide = slides[i];
            if (gridEnabled) swiper.grid.updateSlide(i, slide, slides);
            if (slides[i] && elementStyle(slide, "display") === "none") continue;
            if (params.slidesPerView === "auto") {
                if (shouldResetSlideSize) slides[i].style[swiper.getDirectionLabel("width")] = ``;
                const slideStyles = getComputedStyle(slide);
                const currentTransform = slide.style.transform;
                const currentWebKitTransform = slide.style.webkitTransform;
                if (currentTransform) slide.style.transform = "none";
                if (currentWebKitTransform) slide.style.webkitTransform = "none";
                if (params.roundLengths) slideSize = swiper.isHorizontal() ? utils_elementOuterSize(slide, "width", true) : utils_elementOuterSize(slide, "height", true); else {
                    const width = getDirectionPropertyValue(slideStyles, "width");
                    const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                    const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                    const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                    const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                    const boxSizing = slideStyles.getPropertyValue("box-sizing");
                    if (boxSizing && boxSizing === "border-box") slideSize = width + marginLeft + marginRight; else {
                        const {clientWidth, offsetWidth} = slide;
                        slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                    }
                }
                if (currentTransform) slide.style.transform = currentTransform;
                if (currentWebKitTransform) slide.style.webkitTransform = currentWebKitTransform;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
            } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                if (slides[i]) slides[i].style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
            }
            if (slides[i]) slides[i].swiperSlideSize = slideSize;
            slidesSizesGrid.push(slideSize);
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
            } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }
            swiper.virtualSize += slideSize + spaceBetween;
            prevSlideSize = slideSize;
            index += 1;
        }
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
        if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
        if (params.setWrapperSize) wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
        if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid);
        if (!params.centeredSlides) {
            const newSlidesGrid = [];
            for (let i = 0; i < snapGrid.length; i += 1) {
                let slidesGridItem = snapGrid[i];
                if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
        }
        if (isVirtual && params.loop) {
            const size = slidesSizesGrid[0] + spaceBetween;
            if (params.slidesPerGroup > 1) {
                const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
                const groupSize = size * params.slidesPerGroup;
                for (let i = 0; i < groups; i += 1) snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
            }
            for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
                if (params.slidesPerGroup === 1) snapGrid.push(snapGrid[snapGrid.length - 1] + size);
                slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
                swiper.virtualSize += size;
            }
        }
        if (snapGrid.length === 0) snapGrid = [ 0 ];
        if (spaceBetween !== 0) {
            const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
            slides.filter(((_, slideIndex) => {
                if (!params.cssMode || params.loop) return true;
                if (slideIndex === slides.length - 1) return false;
                return true;
            })).forEach((slideEl => {
                slideEl.style[key] = `${spaceBetween}px`;
            }));
        }
        if (params.centeredSlides && params.centeredSlidesBounds) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            }));
            allSlidesSize -= spaceBetween;
            const maxSnap = allSlidesSize - swiperSize;
            snapGrid = snapGrid.map((snap => {
                if (snap <= 0) return -offsetBefore;
                if (snap > maxSnap) return maxSnap + offsetAfter;
                return snap;
            }));
        }
        if (params.centerInsufficientSlides) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            }));
            allSlidesSize -= spaceBetween;
            if (allSlidesSize < swiperSize) {
                const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                snapGrid.forEach(((snap, snapIndex) => {
                    snapGrid[snapIndex] = snap - allSlidesOffset;
                }));
                slidesGrid.forEach(((snap, snapIndex) => {
                    slidesGrid[snapIndex] = snap + allSlidesOffset;
                }));
            }
        }
        Object.assign(swiper, {
            slides,
            snapGrid,
            slidesGrid,
            slidesSizesGrid
        });
        if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
            const addToSnapGrid = -swiper.snapGrid[0];
            const addToSlidesGrid = -swiper.slidesGrid[0];
            swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
            swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
        }
        if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
        if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            swiper.emit("snapGridLengthChange");
        }
        if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        swiper.emit("slidesUpdated");
        if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
            const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
            const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
            if (slidesLength <= params.maxBackfaceHiddenSlides) {
                if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
            } else if (hasClassBackfaceClassAdded) swiper.el.classList.remove(backFaceHiddenClass);
        }
    }
    function updateAutoHeight(speed) {
        const swiper = this;
        const activeSlides = [];
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let newHeight = 0;
        let i;
        if (typeof speed === "number") swiper.setTransition(speed); else if (speed === true) swiper.setTransition(swiper.params.speed);
        const getSlideByIndex = index => {
            if (isVirtual) return swiper.slides[swiper.getSlideIndexByData(index)];
            return swiper.slides[index];
        };
        if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || []).forEach((slide => {
            activeSlides.push(slide);
        })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
        } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
        for (i = 0; i < activeSlides.length; i += 1) if (typeof activeSlides[i] !== "undefined") {
            const height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight;
        }
        if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
    }
    function updateSlidesOffset() {
        const swiper = this;
        const slides = swiper.slides;
        const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
        for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
    function updateSlidesProgress(translate) {
        if (translate === void 0) translate = this && this.translate || 0;
        const swiper = this;
        const params = swiper.params;
        const {slides, rtlTranslate: rtl, snapGrid} = swiper;
        if (slides.length === 0) return;
        if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
        let offsetCenter = -translate;
        if (rtl) offsetCenter = translate;
        slides.forEach((slideEl => {
            slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass);
        }));
        swiper.visibleSlidesIndexes = [];
        swiper.visibleSlides = [];
        let spaceBetween = params.spaceBetween;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            let slideOffset = slide.swiperSlideOffset;
            if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
            const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const slideBefore = -(offsetCenter - slideOffset);
            const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
            const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
            const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
            if (isVisible) {
                swiper.visibleSlides.push(slide);
                swiper.visibleSlidesIndexes.push(i);
                slides[i].classList.add(params.slideVisibleClass);
            }
            if (isFullyVisible) slides[i].classList.add(params.slideFullyVisibleClass);
            slide.progress = rtl ? -slideProgress : slideProgress;
            slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
        }
    }
    function updateProgress(translate) {
        const swiper = this;
        if (typeof translate === "undefined") {
            const multiplier = swiper.rtlTranslate ? -1 : 1;
            translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
        }
        const params = swiper.params;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        let {progress, isBeginning, isEnd, progressLoop} = swiper;
        const wasBeginning = isBeginning;
        const wasEnd = isEnd;
        if (translatesDiff === 0) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
        } else {
            progress = (translate - swiper.minTranslate()) / translatesDiff;
            const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
            const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
            isBeginning = isBeginningRounded || progress <= 0;
            isEnd = isEndRounded || progress >= 1;
            if (isBeginningRounded) progress = 0;
            if (isEndRounded) progress = 1;
        }
        if (params.loop) {
            const firstSlideIndex = swiper.getSlideIndexByData(0);
            const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
            const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
            const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
            const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
            const translateAbs = Math.abs(translate);
            if (translateAbs >= firstSlideTranslate) progressLoop = (translateAbs - firstSlideTranslate) / translateMax; else progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
            if (progressLoop > 1) progressLoop -= 1;
        }
        Object.assign(swiper, {
            progress,
            progressLoop,
            isBeginning,
            isEnd
        });
        if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
        if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
        if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
        if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
        swiper.emit("progress", progress);
    }
    function updateSlidesClasses() {
        const swiper = this;
        const {slides, params, slidesEl, activeIndex} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        const getFilteredSlide = selector => utils_elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
        slides.forEach((slideEl => {
            slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
        }));
        let activeSlide;
        let prevSlide;
        let nextSlide;
        if (isVirtual) if (params.loop) {
            let slideIndex = activeIndex - swiper.virtual.slidesBefore;
            if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
            if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
            activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
        } else activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`); else if (gridEnabled) {
            activeSlide = slides.filter((slideEl => slideEl.column === activeIndex))[0];
            nextSlide = slides.filter((slideEl => slideEl.column === activeIndex + 1))[0];
            prevSlide = slides.filter((slideEl => slideEl.column === activeIndex - 1))[0];
        } else activeSlide = slides[activeIndex];
        if (activeSlide) {
            activeSlide.classList.add(params.slideActiveClass);
            if (gridEnabled) {
                if (nextSlide) nextSlide.classList.add(params.slideNextClass);
                if (prevSlide) prevSlide.classList.add(params.slidePrevClass);
            } else {
                nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
                if (params.loop && !nextSlide) nextSlide = slides[0];
                if (nextSlide) nextSlide.classList.add(params.slideNextClass);
                prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
                if (params.loop && !prevSlide === 0) prevSlide = slides[slides.length - 1];
                if (prevSlide) prevSlide.classList.add(params.slidePrevClass);
            }
        }
        swiper.emitSlidesClasses();
    }
    const processLazyPreloader = (swiper, imageEl) => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
        const slideEl = imageEl.closest(slideSelector());
        if (slideEl) {
            let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (!lazyEl && swiper.isElement) if (slideEl.shadowRoot) lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`); else requestAnimationFrame((() => {
                if (slideEl.shadowRoot) {
                    lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                    if (lazyEl) lazyEl.remove();
                }
            }));
            if (lazyEl) lazyEl.remove();
        }
    };
    const unlazy = (swiper, index) => {
        if (!swiper.slides[index]) return;
        const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
        if (imageEl) imageEl.removeAttribute("loading");
    };
    const preload = swiper => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        let amount = swiper.params.lazyPreloadPrevNext;
        const len = swiper.slides.length;
        if (!len || !amount || amount < 0) return;
        amount = Math.min(amount, len);
        const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
        const activeIndex = swiper.activeIndex;
        if (swiper.params.grid && swiper.params.grid.rows > 1) {
            const activeColumn = activeIndex;
            const preloadColumns = [ activeColumn - amount ];
            preloadColumns.push(...Array.from({
                length: amount
            }).map(((_, i) => activeColumn + slidesPerView + i)));
            swiper.slides.forEach(((slideEl, i) => {
                if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
            }));
            return;
        }
        const slideIndexLastInView = activeIndex + slidesPerView - 1;
        if (swiper.params.rewind || swiper.params.loop) for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
            const realIndex = (i % len + len) % len;
            if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
        } else for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) unlazy(swiper, i);
    };
    function getActiveIndexByTranslate(swiper) {
        const {slidesGrid, params} = swiper;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        let activeIndex;
        for (let i = 0; i < slidesGrid.length; i += 1) if (typeof slidesGrid[i + 1] !== "undefined") {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
        } else if (translate >= slidesGrid[i]) activeIndex = i;
        if (params.normalizeSlideIndex) if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
        return activeIndex;
    }
    function updateActiveIndex(newActiveIndex) {
        const swiper = this;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        const {snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
        let activeIndex = newActiveIndex;
        let snapIndex;
        const getVirtualRealIndex = aIndex => {
            let realIndex = aIndex - swiper.virtual.slidesBefore;
            if (realIndex < 0) realIndex = swiper.virtual.slides.length + realIndex;
            if (realIndex >= swiper.virtual.slides.length) realIndex -= swiper.virtual.slides.length;
            return realIndex;
        };
        if (typeof activeIndex === "undefined") activeIndex = getActiveIndexByTranslate(swiper);
        if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
            const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
            snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
        }
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        if (activeIndex === previousIndex && !swiper.params.loop) {
            if (snapIndex !== previousSnapIndex) {
                swiper.snapIndex = snapIndex;
                swiper.emit("snapIndexChange");
            }
            return;
        }
        if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
            swiper.realIndex = getVirtualRealIndex(activeIndex);
            return;
        }
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        let realIndex;
        if (swiper.virtual && params.virtual.enabled && params.loop) realIndex = getVirtualRealIndex(activeIndex); else if (gridEnabled) {
            const firstSlideInColumn = swiper.slides.filter((slideEl => slideEl.column === activeIndex))[0];
            let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
            if (Number.isNaN(activeSlideIndex)) activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
            realIndex = Math.floor(activeSlideIndex / params.grid.rows);
        } else if (swiper.slides[activeIndex]) {
            const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
            if (slideIndex) realIndex = parseInt(slideIndex, 10); else realIndex = activeIndex;
        } else realIndex = activeIndex;
        Object.assign(swiper, {
            previousSnapIndex,
            snapIndex,
            previousRealIndex,
            realIndex,
            previousIndex,
            activeIndex
        });
        if (swiper.initialized) preload(swiper);
        swiper.emit("activeIndexChange");
        swiper.emit("snapIndexChange");
        if (swiper.initialized || swiper.params.runCallbacksOnInit) {
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            swiper.emit("slideChange");
        }
    }
    function updateClickedSlide(el, path) {
        const swiper = this;
        const params = swiper.params;
        let slide = el.closest(`.${params.slideClass}, swiper-slide`);
        if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) [ ...path.slice(path.indexOf(el) + 1, path.length) ].forEach((pathEl => {
            if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) slide = pathEl;
        }));
        let slideFound = false;
        let slideIndex;
        if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
        }
        if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(slide.getAttribute("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
        } else {
            swiper.clickedSlide = void 0;
            swiper.clickedIndex = void 0;
            return;
        }
        if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
    }
    var update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
    };
    function getSwiperTranslate(axis) {
        if (axis === void 0) axis = this.isHorizontal() ? "x" : "y";
        const swiper = this;
        const {params, rtlTranslate: rtl, translate, wrapperEl} = swiper;
        if (params.virtualTranslate) return rtl ? -translate : translate;
        if (params.cssMode) return translate;
        let currentTranslate = utils_getTranslate(wrapperEl, axis);
        currentTranslate += swiper.cssOverflowAdjustment();
        if (rtl) currentTranslate = -currentTranslate;
        return currentTranslate || 0;
    }
    function setTranslate(translate, byController) {
        const swiper = this;
        const {rtlTranslate: rtl, params, wrapperEl, progress} = swiper;
        let x = 0;
        let y = 0;
        const z = 0;
        if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
        if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
        }
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y;
        if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) {
            if (swiper.isHorizontal()) x -= swiper.cssOverflowAdjustment(); else y -= swiper.cssOverflowAdjustment();
            wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        }
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== progress) swiper.updateProgress(translate);
        swiper.emit("setTranslate", swiper.translate, byController);
    }
    function minTranslate() {
        return -this.snapGrid[0];
    }
    function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
    }
    function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
        if (translate === void 0) translate = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (translateBounds === void 0) translateBounds = true;
        const swiper = this;
        const {params, wrapperEl} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition) return false;
        const minTranslate = swiper.minTranslate();
        const maxTranslate = swiper.maxTranslate();
        let newTranslate;
        if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
        swiper.updateProgress(newTranslate);
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            if (speed === 0) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: -newTranslate,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: -newTranslate,
                    behavior: "smooth"
                });
            }
            return true;
        }
        if (speed === 0) {
            swiper.setTransition(0);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionEnd");
            }
        } else {
            swiper.setTransition(speed);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionStart");
            }
            if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.onTranslateToWrapperTransitionEnd = null;
                    delete swiper.onTranslateToWrapperTransitionEnd;
                    if (runCallbacks) swiper.emit("transitionEnd");
                };
                swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            }
        }
        return true;
    }
    var translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
    };
    function setTransition(duration, byController) {
        const swiper = this;
        if (!swiper.params.cssMode) {
            swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
            swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
        }
        swiper.emit("setTransition", duration, byController);
    }
    function transitionEmit(_ref) {
        let {swiper, runCallbacks, direction, step} = _ref;
        const {activeIndex, previousIndex} = swiper;
        let dir = direction;
        if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
        swiper.emit(`transition${step}`);
        if (runCallbacks && activeIndex !== previousIndex) {
            if (dir === "reset") {
                swiper.emit(`slideResetTransition${step}`);
                return;
            }
            swiper.emit(`slideChangeTransition${step}`);
            if (dir === "next") swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
        }
    }
    function transitionStart(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params} = swiper;
        if (params.cssMode) return;
        if (params.autoHeight) swiper.updateAutoHeight();
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "Start"
        });
    }
    function transitionEnd(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params} = swiper;
        swiper.animating = false;
        if (params.cssMode) return;
        swiper.setTransition(0);
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "End"
        });
    }
    var transition = {
        setTransition,
        transitionStart,
        transitionEnd
    };
    function slideTo(index, speed, runCallbacks, internal, initial) {
        if (index === void 0) index = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (typeof index === "string") index = parseInt(index, 10);
        const swiper = this;
        let slideIndex = index;
        if (slideIndex < 0) slideIndex = 0;
        const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
        let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        const translate = -snapGrid[snapIndex];
        if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
            const normalizedTranslate = -Math.floor(translate * 100);
            const normalizedGrid = Math.floor(slidesGrid[i] * 100);
            const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
            if (typeof slidesGrid[i + 1] !== "undefined") {
                if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
            } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
        }
        if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) return false;
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
        }
        if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
        swiper.updateProgress(translate);
        let direction;
        if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
        if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
            swiper.updateActiveIndex(slideIndex);
            if (params.autoHeight) swiper.updateAutoHeight();
            swiper.updateSlidesClasses();
            if (params.effect !== "slide") swiper.setTranslate(translate);
            if (direction !== "reset") {
                swiper.transitionStart(runCallbacks, direction);
                swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
        }
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            const t = rtl ? translate : -translate;
            if (speed === 0) {
                const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                if (isVirtual) {
                    swiper.wrapperEl.style.scrollSnapType = "none";
                    swiper._immediateVirtual = true;
                }
                if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
                    swiper._cssModeVirtualInitialSet = true;
                    requestAnimationFrame((() => {
                        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    }));
                } else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                if (isVirtual) requestAnimationFrame((() => {
                    swiper.wrapperEl.style.scrollSnapType = "";
                    swiper._immediateVirtual = false;
                }));
            } else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: t,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: t,
                    behavior: "smooth"
                });
            }
            return true;
        }
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (speed === 0) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
            swiper.animating = true;
            if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                if (!swiper || swiper.destroyed) return;
                if (e.target !== this) return;
                swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.onSlideToWrapperTransitionEnd = null;
                delete swiper.onSlideToWrapperTransitionEnd;
                swiper.transitionEnd(runCallbacks, direction);
            };
            swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        }
        return true;
    }
    function slideToLoop(index, speed, runCallbacks, internal) {
        if (index === void 0) index = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (typeof index === "string") {
            const indexAsNumber = parseInt(index, 10);
            index = indexAsNumber;
        }
        const swiper = this;
        const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
        let newIndex = index;
        if (swiper.params.loop) if (swiper.virtual && swiper.params.virtual.enabled) newIndex += swiper.virtual.slidesBefore; else {
            let targetSlideIndex;
            if (gridEnabled) {
                const slideIndex = newIndex * swiper.params.grid.rows;
                targetSlideIndex = swiper.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex))[0].column;
            } else targetSlideIndex = swiper.getSlideIndexByData(newIndex);
            const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
            const {centeredSlides} = swiper.params;
            let slidesPerView = swiper.params.slidesPerView;
            if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
                slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
                if (centeredSlides && slidesPerView % 2 === 0) slidesPerView += 1;
            }
            let needLoopFix = cols - targetSlideIndex < slidesPerView;
            if (centeredSlides) needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
            if (needLoopFix) {
                const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
                swiper.loopFix({
                    direction,
                    slideTo: true,
                    activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
                    slideRealIndex: direction === "next" ? swiper.realIndex : void 0
                });
            }
            if (gridEnabled) {
                const slideIndex = newIndex * swiper.params.grid.rows;
                newIndex = swiper.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex))[0].column;
            } else newIndex = swiper.getSlideIndexByData(newIndex);
        }
        requestAnimationFrame((() => {
            swiper.slideTo(newIndex, speed, runCallbacks, internal);
        }));
        return swiper;
    }
    function slideNext(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {enabled, params, animating} = swiper;
        if (!enabled) return swiper;
        let perGroup = params.slidesPerGroup;
        if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
        const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "next"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
            if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
                requestAnimationFrame((() => {
                    swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
                }));
                return true;
            }
        }
        if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
        return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }
    function slidePrev(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params, snapGrid, slidesGrid, rtlTranslate, enabled, animating} = swiper;
        if (!enabled) return swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "prev"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
        }
        const translate = rtlTranslate ? swiper.translate : -swiper.translate;
        function normalize(val) {
            if (val < 0) return -Math.floor(Math.abs(val));
            return Math.floor(val);
        }
        const normalizedTranslate = normalize(translate);
        const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
        let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
        if (typeof prevSnap === "undefined" && params.cssMode) {
            let prevSnapIndex;
            snapGrid.forEach(((snap, snapIndex) => {
                if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
            }));
            if (typeof prevSnapIndex !== "undefined") prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
        let prevIndex = 0;
        if (typeof prevSnap !== "undefined") {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
            if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
                prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                prevIndex = Math.max(prevIndex, 0);
            }
        }
        if (params.rewind && swiper.isBeginning) {
            const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
            return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
        } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
            requestAnimationFrame((() => {
                swiper.slideTo(prevIndex, speed, runCallbacks, internal);
            }));
            return true;
        }
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }
    function slideReset(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }
    function slideToClosest(speed, runCallbacks, internal, threshold) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (threshold === void 0) threshold = .5;
        const swiper = this;
        let index = swiper.activeIndex;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
        const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        if (translate >= swiper.snapGrid[snapIndex]) {
            const currentSnap = swiper.snapGrid[snapIndex];
            const nextSnap = swiper.snapGrid[snapIndex + 1];
            if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
        } else {
            const prevSnap = swiper.snapGrid[snapIndex - 1];
            const currentSnap = swiper.snapGrid[snapIndex];
            if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
        }
        index = Math.max(index, 0);
        index = Math.min(index, swiper.slidesGrid.length - 1);
        return swiper.slideTo(index, speed, runCallbacks, internal);
    }
    function slideToClickedSlide() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        let slideToIndex = swiper.clickedIndex;
        let realIndex;
        const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
        if (params.loop) {
            if (swiper.animating) return;
            realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
            if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex);
        } else swiper.slideTo(slideToIndex);
    }
    var slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
    };
    function loopCreate(slideRealIndex) {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        const initSlides = () => {
            const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            slides.forEach(((el, index) => {
                el.setAttribute("data-swiper-slide-index", index);
            }));
        };
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
        const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
        const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
        const addBlankSlides = amountOfSlides => {
            for (let i = 0; i < amountOfSlides; i += 1) {
                const slideEl = swiper.isElement ? utils_createElement("swiper-slide", [ params.slideBlankClass ]) : utils_createElement("div", [ params.slideClass, params.slideBlankClass ]);
                swiper.slidesEl.append(slideEl);
            }
        };
        if (shouldFillGroup) {
            if (params.loopAddBlankSlides) {
                const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
                addBlankSlides(slidesToAdd);
                swiper.recalcSlides();
                swiper.updateSlides();
            } else showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
            initSlides();
        } else if (shouldFillGrid) {
            if (params.loopAddBlankSlides) {
                const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
                addBlankSlides(slidesToAdd);
                swiper.recalcSlides();
                swiper.updateSlides();
            } else showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
            initSlides();
        } else initSlides();
        swiper.loopFix({
            slideRealIndex,
            direction: params.centeredSlides ? void 0 : "next"
        });
    }
    function loopFix(_temp) {
        let {slideRealIndex, slideTo = true, direction, setTranslate, activeSlideIndex, byController, byMousewheel} = _temp === void 0 ? {} : _temp;
        const swiper = this;
        if (!swiper.params.loop) return;
        swiper.emit("beforeLoopFix");
        const {slides, allowSlidePrev, allowSlideNext, slidesEl, params} = swiper;
        const {centeredSlides} = params;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        if (swiper.virtual && params.virtual.enabled) {
            if (slideTo) if (!params.centeredSlides && swiper.snapIndex === 0) swiper.slideTo(swiper.virtual.slides.length, 0, false, true); else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true); else if (swiper.snapIndex === swiper.snapGrid.length - 1) swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
            return;
        }
        let slidesPerView = params.slidesPerView;
        if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
            slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
            if (centeredSlides && slidesPerView % 2 === 0) slidesPerView += 1;
        }
        const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
        let loopedSlides = slidesPerGroup;
        if (loopedSlides % slidesPerGroup !== 0) loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
        loopedSlides += params.loopAdditionalSlides;
        swiper.loopedSlides = loopedSlides;
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        if (slides.length < slidesPerView + loopedSlides) showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"); else if (gridEnabled && params.grid.fill === "row") showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
        const prependSlidesIndexes = [];
        const appendSlidesIndexes = [];
        let activeIndex = swiper.activeIndex;
        if (typeof activeSlideIndex === "undefined") activeSlideIndex = swiper.getSlideIndex(slides.filter((el => el.classList.contains(params.slideActiveClass)))[0]); else activeIndex = activeSlideIndex;
        const isNext = direction === "next" || !direction;
        const isPrev = direction === "prev" || !direction;
        let slidesPrepended = 0;
        let slidesAppended = 0;
        const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
        const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
        const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate === "undefined" ? -slidesPerView / 2 + .5 : 0);
        if (activeColIndexWithShift < loopedSlides) {
            slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
            for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
                const index = i - Math.floor(i / cols) * cols;
                if (gridEnabled) {
                    const colIndexToPrepend = cols - index - 1;
                    for (let i = slides.length - 1; i >= 0; i -= 1) if (slides[i].column === colIndexToPrepend) prependSlidesIndexes.push(i);
                } else prependSlidesIndexes.push(cols - index - 1);
            }
        } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
            slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
            for (let i = 0; i < slidesAppended; i += 1) {
                const index = i - Math.floor(i / cols) * cols;
                if (gridEnabled) slides.forEach(((slide, slideIndex) => {
                    if (slide.column === index) appendSlidesIndexes.push(slideIndex);
                })); else appendSlidesIndexes.push(index);
            }
        }
        swiper.__preventObserver__ = true;
        requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
        if (isPrev) prependSlidesIndexes.forEach((index => {
            slides[index].swiperLoopMoveDOM = true;
            slidesEl.prepend(slides[index]);
            slides[index].swiperLoopMoveDOM = false;
        }));
        if (isNext) appendSlidesIndexes.forEach((index => {
            slides[index].swiperLoopMoveDOM = true;
            slidesEl.append(slides[index]);
            slides[index].swiperLoopMoveDOM = false;
        }));
        swiper.recalcSlides();
        if (params.slidesPerView === "auto") swiper.updateSlides(); else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) swiper.slides.forEach(((slide, slideIndex) => {
            swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
        }));
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (slideTo) if (prependSlidesIndexes.length > 0 && isPrev) {
            if (typeof slideRealIndex === "undefined") {
                const currentSlideTranslate = swiper.slidesGrid[activeIndex];
                const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
                const diff = newSlideTranslate - currentSlideTranslate;
                if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                    swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
                    if (setTranslate) {
                        swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                        swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                    }
                }
            } else if (setTranslate) {
                const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
                swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
                swiper.touchEventsData.currentTranslate = swiper.translate;
            }
        } else if (appendSlidesIndexes.length > 0 && isNext) if (typeof slideRealIndex === "undefined") {
            const currentSlideTranslate = swiper.slidesGrid[activeIndex];
            const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
            const diff = newSlideTranslate - currentSlideTranslate;
            if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
                if (setTranslate) {
                    swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                    swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                }
            }
        } else {
            const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
            swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.controller && swiper.controller.control && !byController) {
            const loopParams = {
                slideRealIndex,
                direction,
                setTranslate,
                activeSlideIndex,
                byController: true
            };
            if (Array.isArray(swiper.controller.control)) swiper.controller.control.forEach((c => {
                if (!c.destroyed && c.params.loop) c.loopFix({
                    ...loopParams,
                    slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
                });
            })); else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) swiper.controller.control.loopFix({
                ...loopParams,
                slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
            });
        }
        swiper.emit("loopFix");
    }
    function loopDestroy() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        swiper.recalcSlides();
        const newSlidesOrder = [];
        swiper.slides.forEach((slideEl => {
            const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
            newSlidesOrder[index] = slideEl;
        }));
        swiper.slides.forEach((slideEl => {
            slideEl.removeAttribute("data-swiper-slide-index");
        }));
        newSlidesOrder.forEach((slideEl => {
            slidesEl.append(slideEl);
        }));
        swiper.recalcSlides();
        swiper.slideTo(swiper.realIndex, 0);
    }
    var loop = {
        loopCreate,
        loopFix,
        loopDestroy
    };
    function setGrabCursor(moving) {
        const swiper = this;
        if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        el.style.cursor = "move";
        el.style.cursor = moving ? "grabbing" : "grab";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    function unsetGrabCursor() {
        const swiper = this;
        if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    var grabCursor = {
        setGrabCursor,
        unsetGrabCursor
    };
    function closestElement(selector, base) {
        if (base === void 0) base = this;
        function __closestFrom(el) {
            if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
            if (el.assignedSlot) el = el.assignedSlot;
            const found = el.closest(selector);
            if (!found && !el.getRootNode) return null;
            return found || __closestFrom(el.getRootNode().host);
        }
        return __closestFrom(base);
    }
    function preventEdgeSwipe(swiper, event, startX) {
        const window = ssr_window_esm_getWindow();
        const {params} = swiper;
        const edgeSwipeDetection = params.edgeSwipeDetection;
        const edgeSwipeThreshold = params.edgeSwipeThreshold;
        if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
            if (edgeSwipeDetection === "prevent") {
                event.preventDefault();
                return true;
            }
            return false;
        }
        return true;
    }
    function onTouchStart(event) {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        const data = swiper.touchEventsData;
        if (e.type === "pointerdown") {
            if (data.pointerId !== null && data.pointerId !== e.pointerId) return;
            data.pointerId = e.pointerId;
        } else if (e.type === "touchstart" && e.targetTouches.length === 1) data.touchId = e.targetTouches[0].identifier;
        if (e.type === "touchstart") {
            preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
            return;
        }
        const {params, touches, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && e.pointerType === "mouse") return;
        if (swiper.animating && params.preventInteractionOnTransition) return;
        if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
        let targetEl = e.target;
        if (params.touchEventsTarget === "wrapper") if (!swiper.wrapperEl.contains(targetEl)) return;
        if ("which" in e && e.which === 3) return;
        if ("button" in e && e.button > 0) return;
        if (data.isTouched && data.isMoved) return;
        const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
        const eventPath = e.composedPath ? e.composedPath() : e.path;
        if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) targetEl = eventPath[0];
        const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
        const isTargetShadow = !!(e.target && e.target.shadowRoot);
        if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
            swiper.allowClick = true;
            return;
        }
        if (params.swipeHandler) if (!targetEl.closest(params.swipeHandler)) return;
        touches.currentX = e.pageX;
        touches.currentY = e.pageY;
        const startX = touches.currentX;
        const startY = touches.currentY;
        if (!preventEdgeSwipe(swiper, e, startX)) return;
        Object.assign(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: void 0,
            startMoving: void 0
        });
        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = utils_now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = void 0;
        if (params.threshold > 0) data.allowThresholdMove = false;
        let preventDefault = true;
        if (targetEl.matches(data.focusableElements)) {
            preventDefault = false;
            if (targetEl.nodeName === "SELECT") data.isTouched = false;
        }
        if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl) document.activeElement.blur();
        const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
        if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) e.preventDefault();
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
        swiper.emit("touchStart", e);
    }
    function onTouchMove(event) {
        const document = ssr_window_esm_getDocument();
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && event.pointerType === "mouse") return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (e.type === "pointermove") {
            if (data.touchId !== null) return;
            const id = e.pointerId;
            if (id !== data.pointerId) return;
        }
        let targetTouch;
        if (e.type === "touchmove") {
            targetTouch = [ ...e.changedTouches ].filter((t => t.identifier === data.touchId))[0];
            if (!targetTouch || targetTouch.identifier !== data.touchId) return;
        } else targetTouch = e;
        if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
            return;
        }
        const pageX = targetTouch.pageX;
        const pageY = targetTouch.pageY;
        if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
        }
        if (!swiper.allowTouchMove) {
            if (!e.target.matches(data.focusableElements)) swiper.allowClick = false;
            if (data.isTouched) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    currentX: pageX,
                    currentY: pageY
                });
                data.touchStartTime = utils_now();
            }
            return;
        }
        if (params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
            if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                data.isTouched = false;
                data.isMoved = false;
                return;
            }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
        if (document.activeElement) if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
            data.isMoved = true;
            swiper.allowClick = false;
            return;
        }
        if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
        touches.previousX = touches.currentX;
        touches.previousY = touches.currentY;
        touches.currentX = pageX;
        touches.currentY = pageY;
        const diffX = touches.currentX - touches.startX;
        const diffY = touches.currentY - touches.startY;
        if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
        if (typeof data.isScrolling === "undefined") {
            let touchAngle;
            if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
                data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
            }
        }
        if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
        if (typeof data.startMoving === "undefined") if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
        if (data.isScrolling) {
            data.isTouched = false;
            return;
        }
        if (!data.startMoving) return;
        swiper.allowClick = false;
        if (!params.cssMode && e.cancelable) e.preventDefault();
        if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
        let diff = swiper.isHorizontal() ? diffX : diffY;
        let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
        if (params.oneWayMovement) {
            diff = Math.abs(diff) * (rtl ? 1 : -1);
            touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
        }
        touches.diff = diff;
        diff *= params.touchRatio;
        if (rtl) {
            diff = -diff;
            touchesDiff = -touchesDiff;
        }
        const prevTouchesDirection = swiper.touchesDirection;
        swiper.swipeDirection = diff > 0 ? "prev" : "next";
        swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
        const isLoop = swiper.params.loop && !params.cssMode;
        const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
        if (!data.isMoved) {
            if (isLoop && allowLoopFix) swiper.loopFix({
                direction: swiper.swipeDirection
            });
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) {
                const evt = new window.CustomEvent("transitionend", {
                    bubbles: true,
                    cancelable: true
                });
                swiper.wrapperEl.dispatchEvent(evt);
            }
            data.allowMomentumBounce = false;
            if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(true);
            swiper.emit("sliderFirstMove", e);
        }
        let loopFixed;
        (new Date).getTime();
        if (data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
            Object.assign(touches, {
                startX: pageX,
                startY: pageY,
                currentX: pageX,
                currentY: pageY,
                startTranslate: data.currentTranslate
            });
            data.loopSwapReset = true;
            data.startTranslate = data.currentTranslate;
            return;
        }
        swiper.emit("sliderMove", e);
        data.isMoved = true;
        data.currentTranslate = diff + data.startTranslate;
        let disableParentSwiper = true;
        let resistanceRatio = params.resistanceRatio;
        if (params.touchReleaseOnEdges) resistanceRatio = 0;
        if (diff > 0) {
            if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] : swiper.minTranslate())) swiper.loopFix({
                direction: "prev",
                setTranslate: true,
                activeSlideIndex: 0
            });
            if (data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            }
        } else if (diff < 0) {
            if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] : swiper.maxTranslate())) swiper.loopFix({
                direction: "next",
                setTranslate: true,
                activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
            });
            if (data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
        }
        if (disableParentSwiper) e.preventedByNestedSwiper = true;
        if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
        if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
            if (!data.allowThresholdMove) {
                data.allowThresholdMove = true;
                touches.startX = touches.currentX;
                touches.startY = touches.currentY;
                data.currentTranslate = data.startTranslate;
                touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                return;
            }
        } else {
            data.currentTranslate = data.startTranslate;
            return;
        }
        if (!params.followFinger || params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
        swiper.updateProgress(data.currentTranslate);
        swiper.setTranslate(data.currentTranslate);
    }
    function onTouchEnd(event) {
        const swiper = this;
        const data = swiper.touchEventsData;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        let targetTouch;
        const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
        if (!isTouchEvent) {
            if (data.touchId !== null) return;
            if (e.pointerId !== data.pointerId) return;
            targetTouch = e;
        } else {
            targetTouch = [ ...e.changedTouches ].filter((t => t.identifier === data.touchId))[0];
            if (!targetTouch || targetTouch.identifier !== data.touchId) return;
        }
        if ([ "pointercancel", "pointerout", "pointerleave", "contextmenu" ].includes(e.type)) {
            const proceed = [ "pointercancel", "contextmenu" ].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
            if (!proceed) return;
        }
        data.pointerId = null;
        data.touchId = null;
        const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && e.pointerType === "mouse") return;
        if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
        data.allowTouchCallbacks = false;
        if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(false);
        const touchEndTime = utils_now();
        const timeDiff = touchEndTime - data.touchStartTime;
        if (swiper.allowClick) {
            const pathTree = e.path || e.composedPath && e.composedPath();
            swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
            swiper.emit("tap click", e);
            if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
        }
        data.lastClickTime = utils_now();
        utils_nextTick((() => {
            if (!swiper.destroyed) swiper.allowClick = true;
        }));
        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        let currentPos;
        if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
        if (params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled) {
            swiper.freeMode.onTouchEnd({
                currentPos
            });
            return;
        }
        const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
        let stopIndex = 0;
        let groupSize = swiper.slidesSizesGrid[0];
        for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
            const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (typeof slidesGrid[i + increment] !== "undefined") {
                if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                    stopIndex = i;
                    groupSize = slidesGrid[i + increment] - slidesGrid[i];
                }
            } else if (swipeToLast || currentPos >= slidesGrid[i]) {
                stopIndex = i;
                groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
        }
        let rewindFirstIndex = null;
        let rewindLastIndex = null;
        if (params.rewind) if (swiper.isBeginning) rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
        const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
        const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
        if (timeDiff > params.longSwipesMs) {
            if (!params.longSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if (swiper.swipeDirection === "next") if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
            if (swiper.swipeDirection === "prev") if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
        } else {
            if (!params.shortSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
            if (!isNavButtonTarget) {
                if (swiper.swipeDirection === "next") swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
                if (swiper.swipeDirection === "prev") swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
            } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
        }
    }
    function onResize() {
        const swiper = this;
        const {params, el} = swiper;
        if (el && el.offsetWidth === 0) return;
        if (params.breakpoints) swiper.setBreakpoint();
        const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateSlidesClasses();
        const isVirtualLoop = isVirtual && params.loop;
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else if (swiper.params.loop && !isVirtual) swiper.slideToLoop(swiper.realIndex, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
            clearTimeout(swiper.autoplay.resizeTimeout);
            swiper.autoplay.resizeTimeout = setTimeout((() => {
                if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.resume();
            }), 500);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
    }
    function onClick(e) {
        const swiper = this;
        if (!swiper.enabled) return;
        if (!swiper.allowClick) {
            if (swiper.params.preventClicks) e.preventDefault();
            if (swiper.params.preventClicksPropagation && swiper.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
    }
    function onScroll() {
        const swiper = this;
        const {wrapperEl, rtlTranslate, enabled} = swiper;
        if (!enabled) return;
        swiper.previousTranslate = swiper.translate;
        if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
        if (swiper.translate === 0) swiper.translate = 0;
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
        swiper.emit("setTranslate", swiper.translate, false);
    }
    function onLoad(e) {
        const swiper = this;
        processLazyPreloader(swiper, e.target);
        if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) return;
        swiper.update();
    }
    function onDocumentTouchStart() {
        const swiper = this;
        if (swiper.documentTouchHandlerProceeded) return;
        swiper.documentTouchHandlerProceeded = true;
        if (swiper.params.touchReleaseOnEdges) swiper.el.style.touchAction = "auto";
    }
    const events = (swiper, method) => {
        const document = ssr_window_esm_getDocument();
        const {params, el, wrapperEl, device} = swiper;
        const capture = !!params.nested;
        const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
        const swiperMethod = method;
        document[domMethod]("touchstart", swiper.onDocumentTouchStart, {
            passive: false,
            capture
        });
        el[domMethod]("touchstart", swiper.onTouchStart, {
            passive: false
        });
        el[domMethod]("pointerdown", swiper.onTouchStart, {
            passive: false
        });
        document[domMethod]("touchmove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("pointermove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("touchend", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerup", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointercancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("touchcancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerout", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerleave", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("contextmenu", swiper.onTouchEnd, {
            passive: true
        });
        if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
        if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
        if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        el[domMethod]("load", swiper.onLoad, {
            capture: true
        });
    };
    function attachEvents() {
        const swiper = this;
        const {params} = swiper;
        swiper.onTouchStart = onTouchStart.bind(swiper);
        swiper.onTouchMove = onTouchMove.bind(swiper);
        swiper.onTouchEnd = onTouchEnd.bind(swiper);
        swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
        if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
        swiper.onClick = onClick.bind(swiper);
        swiper.onLoad = onLoad.bind(swiper);
        events(swiper, "on");
    }
    function detachEvents() {
        const swiper = this;
        events(swiper, "off");
    }
    var events$1 = {
        attachEvents,
        detachEvents
    };
    const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
    function setBreakpoint() {
        const swiper = this;
        const {realIndex, initialized, params, el} = swiper;
        const breakpoints = params.breakpoints;
        if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
        const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
        if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
        const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
        const breakpointParams = breakpointOnlyParams || swiper.originalParams;
        const wasMultiRow = isGridEnabled(swiper, params);
        const isMultiRow = isGridEnabled(swiper, breakpointParams);
        const wasEnabled = params.enabled;
        if (wasMultiRow && !isMultiRow) {
            el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        } else if (!wasMultiRow && isMultiRow) {
            el.classList.add(`${params.containerModifierClass}grid`);
            if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") el.classList.add(`${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        }
        [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
            if (typeof breakpointParams[prop] === "undefined") return;
            const wasModuleEnabled = params[prop] && params[prop].enabled;
            const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
            if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
            if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
        }));
        const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
        const wasLoop = params.loop;
        if (directionChanged && initialized) swiper.changeDirection();
        utils_extend(swiper.params, breakpointParams);
        const isEnabled = swiper.params.enabled;
        const hasLoop = swiper.params.loop;
        Object.assign(swiper, {
            allowTouchMove: swiper.params.allowTouchMove,
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev
        });
        if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
        swiper.currentBreakpoint = breakpoint;
        swiper.emit("_beforeBreakpoint", breakpointParams);
        if (initialized) if (needsReLoop) {
            swiper.loopDestroy();
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        } else if (!wasLoop && hasLoop) {
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        } else if (wasLoop && !hasLoop) swiper.loopDestroy();
        swiper.emit("breakpoint", breakpointParams);
    }
    function getBreakpoint(breakpoints, base, containerEl) {
        if (base === void 0) base = "window";
        if (!breakpoints || base === "container" && !containerEl) return;
        let breakpoint = false;
        const window = ssr_window_esm_getWindow();
        const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
        const points = Object.keys(breakpoints).map((point => {
            if (typeof point === "string" && point.indexOf("@") === 0) {
                const minRatio = parseFloat(point.substr(1));
                const value = currentHeight * minRatio;
                return {
                    value,
                    point
                };
            }
            return {
                value: point,
                point
            };
        }));
        points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
        for (let i = 0; i < points.length; i += 1) {
            const {point, value} = points[i];
            if (base === "window") {
                if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
            } else if (value <= containerEl.clientWidth) breakpoint = point;
        }
        return breakpoint || "max";
    }
    var breakpoints = {
        setBreakpoint,
        getBreakpoint
    };
    function prepareClasses(entries, prefix) {
        const resultClasses = [];
        entries.forEach((item => {
            if (typeof item === "object") Object.keys(item).forEach((classNames => {
                if (item[classNames]) resultClasses.push(prefix + classNames);
            })); else if (typeof item === "string") resultClasses.push(prefix + item);
        }));
        return resultClasses;
    }
    function addClasses() {
        const swiper = this;
        const {classNames, params, rtl, el, device} = swiper;
        const suffixes = prepareClasses([ "initialized", params.direction, {
            "free-mode": swiper.params.freeMode && params.freeMode.enabled
        }, {
            autoheight: params.autoHeight
        }, {
            rtl
        }, {
            grid: params.grid && params.grid.rows > 1
        }, {
            "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
        }, {
            android: device.android
        }, {
            ios: device.ios
        }, {
            "css-mode": params.cssMode
        }, {
            centered: params.cssMode && params.centeredSlides
        }, {
            "watch-progress": params.watchSlidesProgress
        } ], params.containerModifierClass);
        classNames.push(...suffixes);
        el.classList.add(...classNames);
        swiper.emitContainerClasses();
    }
    function swiper_core_removeClasses() {
        const swiper = this;
        const {el, classNames} = swiper;
        el.classList.remove(...classNames);
        swiper.emitContainerClasses();
    }
    var classes = {
        addClasses,
        removeClasses: swiper_core_removeClasses
    };
    function checkOverflow() {
        const swiper = this;
        const {isLocked: wasLocked, params} = swiper;
        const {slidesOffsetBefore} = params;
        if (slidesOffsetBefore) {
            const lastSlideIndex = swiper.slides.length - 1;
            const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
            swiper.isLocked = swiper.size > lastSlideRightEdge;
        } else swiper.isLocked = swiper.snapGrid.length === 1;
        if (params.allowSlideNext === true) swiper.allowSlideNext = !swiper.isLocked;
        if (params.allowSlidePrev === true) swiper.allowSlidePrev = !swiper.isLocked;
        if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
        if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
    var checkOverflow$1 = {
        checkOverflow
    };
    var defaults = {
        init: true,
        direction: "horizontal",
        oneWayMovement: false,
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        eventsPrefix: "swiper",
        enabled: true,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: false,
        userAgent: null,
        url: null,
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        autoHeight: false,
        setWrapperSize: false,
        virtualTranslate: false,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        watchOverflow: true,
        roundLengths: false,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 5,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        uniqueNavElements: true,
        resistance: true,
        resistanceRatio: .85,
        watchSlidesProgress: false,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        loop: false,
        loopAddBlankSlides: true,
        loopAdditionalSlides: 0,
        loopPreventsSliding: true,
        rewind: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: true,
        _emitClasses: false
    };
    function moduleExtendParams(params, allModulesParams) {
        return function extendParams(obj) {
            if (obj === void 0) obj = {};
            const moduleParamName = Object.keys(obj)[0];
            const moduleParams = obj[moduleParamName];
            if (typeof moduleParams !== "object" || moduleParams === null) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (params[moduleParamName] === true) params[moduleParamName] = {
                enabled: true
            };
            if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) params[moduleParamName].auto = true;
            if ([ "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) params[moduleParamName].auto = true;
            if (!(moduleParamName in params && "enabled" in moduleParams)) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
            if (!params[moduleParamName]) params[moduleParamName] = {
                enabled: false
            };
            utils_extend(allModulesParams, obj);
        };
    }
    const prototypes = {
        eventsEmitter,
        update,
        translate,
        transition,
        slide,
        loop,
        grabCursor,
        events: events$1,
        breakpoints,
        checkOverflow: checkOverflow$1,
        classes
    };
    const extendedDefaults = {};
    class Swiper {
        constructor() {
            let el;
            let params;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") params = args[0]; else [el, params] = args;
            if (!params) params = {};
            params = utils_extend({}, params);
            if (el && !params.el) params.el = el;
            const document = ssr_window_esm_getDocument();
            if (params.el && typeof params.el === "string" && document.querySelectorAll(params.el).length > 1) {
                const swipers = [];
                document.querySelectorAll(params.el).forEach((containerEl => {
                    const newParams = utils_extend({}, params, {
                        el: containerEl
                    });
                    swipers.push(new Swiper(newParams));
                }));
                return swipers;
            }
            const swiper = this;
            swiper.__swiper__ = true;
            swiper.support = getSupport();
            swiper.device = getDevice({
                userAgent: params.userAgent
            });
            swiper.browser = getBrowser();
            swiper.eventsListeners = {};
            swiper.eventsAnyListeners = [];
            swiper.modules = [ ...swiper.__modules__ ];
            if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
            const allModulesParams = {};
            swiper.modules.forEach((mod => {
                mod({
                    params,
                    swiper,
                    extendParams: moduleExtendParams(params, allModulesParams),
                    on: swiper.on.bind(swiper),
                    once: swiper.once.bind(swiper),
                    off: swiper.off.bind(swiper),
                    emit: swiper.emit.bind(swiper)
                });
            }));
            const swiperParams = utils_extend({}, defaults, allModulesParams);
            swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = utils_extend({}, swiper.params);
            swiper.passedParams = utils_extend({}, params);
            if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                swiper.on(eventName, swiper.params.on[eventName]);
            }));
            if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
            Object.assign(swiper, {
                enabled: swiper.params.enabled,
                el,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return swiper.params.direction === "horizontal";
                },
                isVertical() {
                    return swiper.params.direction === "vertical";
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: true,
                isEnd: false,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: false,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                },
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: swiper.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    pointerId: null,
                    touchId: null
                },
                allowClick: true,
                allowTouchMove: swiper.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            });
            swiper.emit("_swiper");
            if (swiper.params.init) swiper.init();
            return swiper;
        }
        getDirectionLabel(property) {
            if (this.isHorizontal()) return property;
            return {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[property];
        }
        getSlideIndex(slideEl) {
            const {slidesEl, params} = this;
            const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            const firstSlideIndex = utils_elementIndex(slides[0]);
            return utils_elementIndex(slideEl) - firstSlideIndex;
        }
        getSlideIndexByData(index) {
            return this.getSlideIndex(this.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === index))[0]);
        }
        recalcSlides() {
            const swiper = this;
            const {slidesEl, params} = swiper;
            swiper.slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        }
        enable() {
            const swiper = this;
            if (swiper.enabled) return;
            swiper.enabled = true;
            if (swiper.params.grabCursor) swiper.setGrabCursor();
            swiper.emit("enable");
        }
        disable() {
            const swiper = this;
            if (!swiper.enabled) return;
            swiper.enabled = false;
            if (swiper.params.grabCursor) swiper.unsetGrabCursor();
            swiper.emit("disable");
        }
        setProgress(progress, speed) {
            const swiper = this;
            progress = Math.min(Math.max(progress, 0), 1);
            const min = swiper.minTranslate();
            const max = swiper.maxTranslate();
            const current = (max - min) * progress + min;
            swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        emitContainerClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const cls = swiper.el.className.split(" ").filter((className => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0));
            swiper.emit("_containerClasses", cls.join(" "));
        }
        getSlideClasses(slideEl) {
            const swiper = this;
            if (swiper.destroyed) return "";
            return slideEl.className.split(" ").filter((className => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0)).join(" ");
        }
        emitSlidesClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const updates = [];
            swiper.slides.forEach((slideEl => {
                const classNames = swiper.getSlideClasses(slideEl);
                updates.push({
                    slideEl,
                    classNames
                });
                swiper.emit("_slideClass", slideEl, classNames);
            }));
            swiper.emit("_slideClasses", updates);
        }
        slidesPerViewDynamic(view, exact) {
            if (view === void 0) view = "current";
            if (exact === void 0) exact = false;
            const swiper = this;
            const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
            let spv = 1;
            if (typeof params.slidesPerView === "number") return params.slidesPerView;
            if (params.centeredSlides) {
                let slideSize = slides[activeIndex] ? slides[activeIndex].swiperSlideSize : 0;
                let breakLoop;
                for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
                for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
            } else if (view === "current") for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                if (slideInView) spv += 1;
            } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                if (slideInView) spv += 1;
            }
            return spv;
        }
        update() {
            const swiper = this;
            if (!swiper || swiper.destroyed) return;
            const {snapGrid, params} = swiper;
            if (params.breakpoints) swiper.setBreakpoint();
            [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl);
            }));
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
            function setTranslate() {
                const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                swiper.setTranslate(newTranslate);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            let translated;
            if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
                setTranslate();
                if (params.autoHeight) swiper.updateAutoHeight();
            } else {
                if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
                    const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
                    translated = swiper.slideTo(slides.length - 1, 0, false, true);
                } else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                if (!translated) setTranslate();
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
            swiper.emit("update");
        }
        changeDirection(newDirection, needUpdate) {
            if (needUpdate === void 0) needUpdate = true;
            const swiper = this;
            const currentDirection = swiper.params.direction;
            if (!newDirection) newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
            if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") return swiper;
            swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
            swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
            swiper.emitContainerClasses();
            swiper.params.direction = newDirection;
            swiper.slides.forEach((slideEl => {
                if (newDirection === "vertical") slideEl.style.width = ""; else slideEl.style.height = "";
            }));
            swiper.emit("changeDirection");
            if (needUpdate) swiper.update();
            return swiper;
        }
        changeLanguageDirection(direction) {
            const swiper = this;
            if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
            swiper.rtl = direction === "rtl";
            swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
            if (swiper.rtl) {
                swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "rtl";
            } else {
                swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "ltr";
            }
            swiper.update();
        }
        mount(element) {
            const swiper = this;
            if (swiper.mounted) return true;
            let el = element || swiper.params.el;
            if (typeof el === "string") el = document.querySelector(el);
            if (!el) return false;
            el.swiper = swiper;
            if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === "SWIPER-CONTAINER") swiper.isElement = true;
            const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
            const getWrapper = () => {
                if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                    const res = el.shadowRoot.querySelector(getWrapperSelector());
                    return res;
                }
                return utils_elementChildren(el, getWrapperSelector())[0];
            };
            let wrapperEl = getWrapper();
            if (!wrapperEl && swiper.params.createElements) {
                wrapperEl = utils_createElement("div", swiper.params.wrapperClass);
                el.append(wrapperEl);
                utils_elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl => {
                    wrapperEl.append(slideEl);
                }));
            }
            Object.assign(swiper, {
                el,
                wrapperEl,
                slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
                hostEl: swiper.isElement ? el.parentNode.host : el,
                mounted: true,
                rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
                rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
                wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
            });
            return true;
        }
        init(el) {
            const swiper = this;
            if (swiper.initialized) return swiper;
            const mounted = swiper.mount(el);
            if (mounted === false) return swiper;
            swiper.emit("beforeInit");
            if (swiper.params.breakpoints) swiper.setBreakpoint();
            swiper.addClasses();
            swiper.updateSize();
            swiper.updateSlides();
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
            if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
            if (swiper.params.loop) swiper.loopCreate();
            swiper.attachEvents();
            const lazyElements = [ ...swiper.el.querySelectorAll('[loading="lazy"]') ];
            if (swiper.isElement) lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
            lazyElements.forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl); else imageEl.addEventListener("load", (e => {
                    processLazyPreloader(swiper, e.target);
                }));
            }));
            preload(swiper);
            swiper.initialized = true;
            preload(swiper);
            swiper.emit("init");
            swiper.emit("afterInit");
            return swiper;
        }
        destroy(deleteInstance, cleanStyles) {
            if (deleteInstance === void 0) deleteInstance = true;
            if (cleanStyles === void 0) cleanStyles = true;
            const swiper = this;
            const {params, el, wrapperEl, slides} = swiper;
            if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
            swiper.emit("beforeDestroy");
            swiper.initialized = false;
            swiper.detachEvents();
            if (params.loop) swiper.loopDestroy();
            if (cleanStyles) {
                swiper.removeClasses();
                el.removeAttribute("style");
                wrapperEl.removeAttribute("style");
                if (slides && slides.length) slides.forEach((slideEl => {
                    slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
                    slideEl.removeAttribute("style");
                    slideEl.removeAttribute("data-swiper-slide-index");
                }));
            }
            swiper.emit("destroy");
            Object.keys(swiper.eventsListeners).forEach((eventName => {
                swiper.off(eventName);
            }));
            if (deleteInstance !== false) {
                swiper.el.swiper = null;
                deleteProps(swiper);
            }
            swiper.destroyed = true;
            return null;
        }
        static extendDefaults(newDefaults) {
            utils_extend(extendedDefaults, newDefaults);
        }
        static get extendedDefaults() {
            return extendedDefaults;
        }
        static get defaults() {
            return defaults;
        }
        static installModule(mod) {
            if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
            const modules = Swiper.prototype.__modules__;
            if (typeof mod === "function" && modules.indexOf(mod) < 0) modules.push(mod);
        }
        static use(module) {
            if (Array.isArray(module)) {
                module.forEach((m => Swiper.installModule(m)));
                return Swiper;
            }
            Swiper.installModule(module);
            return Swiper;
        }
    }
    Object.keys(prototypes).forEach((prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }));
    }));
    Swiper.use([ Resize, Observer ]);
    function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
        if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
            if (!params[key] && params.auto === true) {
                let element = utils_elementChildren(swiper.el, `.${checkProps[key]}`)[0];
                if (!element) {
                    element = utils_createElement("div", checkProps[key]);
                    element.className = checkProps[key];
                    swiper.el.append(element);
                }
                params[key] = element;
                originalParams[key] = element;
            }
        }));
        return params;
    }
    function Navigation(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        extendParams({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: false,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        });
        swiper.navigation = {
            nextEl: null,
            prevEl: null
        };
        const makeElementsArray = el => (Array.isArray(el) ? el : [ el ]).filter((e => !!e));
        function getEl(el) {
            let res;
            if (el && typeof el === "string" && swiper.isElement) {
                res = swiper.el.querySelector(el);
                if (res) return res;
            }
            if (el) {
                if (typeof el === "string") res = [ ...document.querySelectorAll(el) ];
                if (swiper.params.uniqueNavElements && typeof el === "string" && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) res = swiper.el.querySelector(el);
            }
            if (el && !res) return el;
            return res;
        }
        function toggleEl(el, disabled) {
            const params = swiper.params.navigation;
            el = makeElementsArray(el);
            el.forEach((subEl => {
                if (subEl) {
                    subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
                    if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
                }
            }));
        }
        function update() {
            const {nextEl, prevEl} = swiper.navigation;
            if (swiper.params.loop) {
                toggleEl(prevEl, false);
                toggleEl(nextEl, false);
                return;
            }
            toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
            toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
        }
        function onPrevClick(e) {
            e.preventDefault();
            if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slidePrev();
            emit("navigationPrev");
        }
        function onNextClick(e) {
            e.preventDefault();
            if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slideNext();
            emit("navigationNext");
        }
        function init() {
            const params = swiper.params.navigation;
            swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            });
            if (!(params.nextEl || params.prevEl)) return;
            let nextEl = getEl(params.nextEl);
            let prevEl = getEl(params.prevEl);
            Object.assign(swiper.navigation, {
                nextEl,
                prevEl
            });
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const initButton = (el, dir) => {
                if (el) el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                if (!swiper.enabled && el) el.classList.add(...params.lockClass.split(" "));
            };
            nextEl.forEach((el => initButton(el, "next")));
            prevEl.forEach((el => initButton(el, "prev")));
        }
        function destroy() {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const destroyButton = (el, dir) => {
                el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
            };
            nextEl.forEach((el => destroyButton(el, "next")));
            prevEl.forEach((el => destroyButton(el, "prev")));
        }
        on("init", (() => {
            if (swiper.params.navigation.enabled === false) disable(); else {
                init();
                update();
            }
        }));
        on("toEdge fromEdge lock unlock", (() => {
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            if (swiper.enabled) {
                update();
                return;
            }
            [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.add(swiper.params.navigation.lockClass)));
        }));
        on("click", ((_s, e) => {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const targetEl = e.target;
            if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
                if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                let isHidden;
                if (nextEl.length) isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass); else if (prevEl.length) isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
                if (isHidden === true) emit("navigationShow"); else emit("navigationHide");
                [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.toggle(swiper.params.navigation.hiddenClass)));
            }
        }));
        const enable = () => {
            swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
            init();
            update();
        };
        const disable = () => {
            swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
            destroy();
        };
        Object.assign(swiper.navigation, {
            enable,
            disable,
            update,
            init,
            destroy
        });
    }
    function Autoplay(_ref) {
        let {swiper, extendParams, on, emit, params} = _ref;
        swiper.autoplay = {
            running: false,
            paused: false,
            timeLeft: 0
        };
        extendParams({
            autoplay: {
                enabled: false,
                delay: 3e3,
                waitForTransition: true,
                disableOnInteraction: false,
                stopOnLastSlide: false,
                reverseDirection: false,
                pauseOnMouseEnter: false
            }
        });
        let timeout;
        let raf;
        let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
        let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
        let autoplayTimeLeft;
        let autoplayStartTime = (new Date).getTime();
        let wasPaused;
        let isTouched;
        let pausedByTouch;
        let touchStartTimeout;
        let slideChanged;
        let pausedByInteraction;
        let pausedByPointerEnter;
        function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
            if (e.target !== swiper.wrapperEl) return;
            swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
            if (pausedByPointerEnter) return;
            resume();
        }
        const calcTimeLeft = () => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (swiper.autoplay.paused) wasPaused = true; else if (wasPaused) {
                autoplayDelayCurrent = autoplayTimeLeft;
                wasPaused = false;
            }
            const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (new Date).getTime();
            swiper.autoplay.timeLeft = timeLeft;
            emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
            raf = requestAnimationFrame((() => {
                calcTimeLeft();
            }));
        };
        const getSlideDelay = () => {
            let activeSlideEl;
            if (swiper.virtual && swiper.params.virtual.enabled) activeSlideEl = swiper.slides.filter((slideEl => slideEl.classList.contains("swiper-slide-active")))[0]; else activeSlideEl = swiper.slides[swiper.activeIndex];
            if (!activeSlideEl) return;
            const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
            return currentSlideDelay;
        };
        const run = delayForce => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            cancelAnimationFrame(raf);
            calcTimeLeft();
            let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
            autoplayDelayTotal = swiper.params.autoplay.delay;
            autoplayDelayCurrent = swiper.params.autoplay.delay;
            const currentSlideDelay = getSlideDelay();
            if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
                delay = currentSlideDelay;
                autoplayDelayTotal = currentSlideDelay;
                autoplayDelayCurrent = currentSlideDelay;
            }
            autoplayTimeLeft = delay;
            const speed = swiper.params.speed;
            const proceed = () => {
                if (!swiper || swiper.destroyed) return;
                if (swiper.params.autoplay.reverseDirection) {
                    if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
                        swiper.slidePrev(speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        swiper.slideTo(swiper.slides.length - 1, speed, true, true);
                        emit("autoplay");
                    }
                } else if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
                    swiper.slideNext(speed, true, true);
                    emit("autoplay");
                } else if (!swiper.params.autoplay.stopOnLastSlide) {
                    swiper.slideTo(0, speed, true, true);
                    emit("autoplay");
                }
                if (swiper.params.cssMode) {
                    autoplayStartTime = (new Date).getTime();
                    requestAnimationFrame((() => {
                        run();
                    }));
                }
            };
            if (delay > 0) {
                clearTimeout(timeout);
                timeout = setTimeout((() => {
                    proceed();
                }), delay);
            } else requestAnimationFrame((() => {
                proceed();
            }));
            return delay;
        };
        const start = () => {
            autoplayStartTime = (new Date).getTime();
            swiper.autoplay.running = true;
            run();
            emit("autoplayStart");
        };
        const stop = () => {
            swiper.autoplay.running = false;
            clearTimeout(timeout);
            cancelAnimationFrame(raf);
            emit("autoplayStop");
        };
        const pause = (internal, reset) => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            clearTimeout(timeout);
            if (!internal) pausedByInteraction = true;
            const proceed = () => {
                emit("autoplayPause");
                if (swiper.params.autoplay.waitForTransition) swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd); else resume();
            };
            swiper.autoplay.paused = true;
            if (reset) {
                if (slideChanged) autoplayTimeLeft = swiper.params.autoplay.delay;
                slideChanged = false;
                proceed();
                return;
            }
            const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
            autoplayTimeLeft = delay - ((new Date).getTime() - autoplayStartTime);
            if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
            if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
            proceed();
        };
        const resume = () => {
            if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
            autoplayStartTime = (new Date).getTime();
            if (pausedByInteraction) {
                pausedByInteraction = false;
                run(autoplayTimeLeft);
            } else run();
            swiper.autoplay.paused = false;
            emit("autoplayResume");
        };
        const onVisibilityChange = () => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            const document = ssr_window_esm_getDocument();
            if (document.visibilityState === "hidden") {
                pausedByInteraction = true;
                pause(true);
            }
            if (document.visibilityState === "visible") resume();
        };
        const onPointerEnter = e => {
            if (e.pointerType !== "mouse") return;
            pausedByInteraction = true;
            pausedByPointerEnter = true;
            if (swiper.animating || swiper.autoplay.paused) return;
            pause(true);
        };
        const onPointerLeave = e => {
            if (e.pointerType !== "mouse") return;
            pausedByPointerEnter = false;
            if (swiper.autoplay.paused) resume();
        };
        const attachMouseEvents = () => {
            if (swiper.params.autoplay.pauseOnMouseEnter) {
                swiper.el.addEventListener("pointerenter", onPointerEnter);
                swiper.el.addEventListener("pointerleave", onPointerLeave);
            }
        };
        const detachMouseEvents = () => {
            swiper.el.removeEventListener("pointerenter", onPointerEnter);
            swiper.el.removeEventListener("pointerleave", onPointerLeave);
        };
        const attachDocumentEvents = () => {
            const document = ssr_window_esm_getDocument();
            document.addEventListener("visibilitychange", onVisibilityChange);
        };
        const detachDocumentEvents = () => {
            const document = ssr_window_esm_getDocument();
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
        on("init", (() => {
            if (swiper.params.autoplay.enabled) {
                attachMouseEvents();
                attachDocumentEvents();
                start();
            }
        }));
        on("destroy", (() => {
            detachMouseEvents();
            detachDocumentEvents();
            if (swiper.autoplay.running) stop();
        }));
        on("_freeModeStaticRelease", (() => {
            if (pausedByTouch || pausedByInteraction) resume();
        }));
        on("_freeModeNoMomentumRelease", (() => {
            if (!swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
        }));
        on("beforeTransitionStart", ((_s, speed, internal) => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (internal || !swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
        }));
        on("sliderFirstMove", (() => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (swiper.params.autoplay.disableOnInteraction) {
                stop();
                return;
            }
            isTouched = true;
            pausedByTouch = false;
            pausedByInteraction = false;
            touchStartTimeout = setTimeout((() => {
                pausedByInteraction = true;
                pausedByTouch = true;
                pause(true);
            }), 200);
        }));
        on("touchEnd", (() => {
            if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
            clearTimeout(touchStartTimeout);
            clearTimeout(timeout);
            if (swiper.params.autoplay.disableOnInteraction) {
                pausedByTouch = false;
                isTouched = false;
                return;
            }
            if (pausedByTouch && swiper.params.cssMode) resume();
            pausedByTouch = false;
            isTouched = false;
        }));
        on("slideChange", (() => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            slideChanged = true;
        }));
        Object.assign(swiper.autoplay, {
            start,
            stop,
            pause,
            resume
        });
    }
    function effect_init_effectInit(params) {
        const {effect, swiper, on, setTranslate, setTransition, overwriteParams, perspective, recreateShadows, getEffectParams} = params;
        on("beforeInit", (() => {
            if (swiper.params.effect !== effect) return;
            swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
            if (perspective && perspective()) swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
            const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
            Object.assign(swiper.params, overwriteParamsResult);
            Object.assign(swiper.originalParams, overwriteParamsResult);
        }));
        on("setTranslate", (() => {
            if (swiper.params.effect !== effect) return;
            setTranslate();
        }));
        on("setTransition", ((_s, duration) => {
            if (swiper.params.effect !== effect) return;
            setTransition(duration);
        }));
        on("transitionEnd", (() => {
            if (swiper.params.effect !== effect) return;
            if (recreateShadows) {
                if (!getEffectParams || !getEffectParams().slideShadows) return;
                swiper.slides.forEach((slideEl => {
                    slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl => shadowEl.remove()));
                }));
                recreateShadows();
            }
        }));
        let requireUpdateOnVirtual;
        on("virtualUpdate", (() => {
            if (swiper.params.effect !== effect) return;
            if (!swiper.slides.length) requireUpdateOnVirtual = true;
            requestAnimationFrame((() => {
                if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
                    setTranslate();
                    requireUpdateOnVirtual = false;
                }
            }));
        }));
    }
    function effect_target_effectTarget(effectParams, slideEl) {
        const transformEl = utils_getSlideTransformEl(slideEl);
        if (transformEl !== slideEl) {
            transformEl.style.backfaceVisibility = "hidden";
            transformEl.style["-webkit-backface-visibility"] = "hidden";
        }
        return transformEl;
    }
    function effect_virtual_transition_end_effectVirtualTransitionEnd(_ref) {
        let {swiper, duration, transformElements, allSlides} = _ref;
        const {activeIndex} = swiper;
        const getSlide = el => {
            if (!el.parentElement) {
                const slide = swiper.slides.filter((slideEl => slideEl.shadowRoot && slideEl.shadowRoot === el.parentNode))[0];
                return slide;
            }
            return el.parentElement;
        };
        if (swiper.params.virtualTranslate && duration !== 0) {
            let eventTriggered = false;
            let transitionEndTarget;
            if (allSlides) transitionEndTarget = transformElements; else transitionEndTarget = transformElements.filter((transformEl => {
                const el = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
                return swiper.getSlideIndex(el) === activeIndex;
            }));
            transitionEndTarget.forEach((el => {
                utils_elementTransitionEnd(el, (() => {
                    if (eventTriggered) return;
                    if (!swiper || swiper.destroyed) return;
                    eventTriggered = true;
                    swiper.animating = false;
                    const evt = new window.CustomEvent("transitionend", {
                        bubbles: true,
                        cancelable: true
                    });
                    swiper.wrapperEl.dispatchEvent(evt);
                }));
            }));
        }
    }
    function EffectFade(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            fadeEffect: {
                crossFade: false
            }
        });
        const setTranslate = () => {
            const {slides} = swiper;
            const params = swiper.params.fadeEffect;
            for (let i = 0; i < slides.length; i += 1) {
                const slideEl = swiper.slides[i];
                const offset = slideEl.swiperSlideOffset;
                let tx = -offset;
                if (!swiper.params.virtualTranslate) tx -= swiper.translate;
                let ty = 0;
                if (!swiper.isHorizontal()) {
                    ty = tx;
                    tx = 0;
                }
                const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
                const targetEl = effect_target_effectTarget(params, slideEl);
                targetEl.style.opacity = slideOpacity;
                targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
            }
        };
        const setTransition = duration => {
            const transformElements = swiper.slides.map((slideEl => utils_getSlideTransformEl(slideEl)));
            transformElements.forEach((el => {
                el.style.transitionDuration = `${duration}ms`;
            }));
            effect_virtual_transition_end_effectVirtualTransitionEnd({
                swiper,
                duration,
                transformElements,
                allSlides: true
            });
        };
        effect_init_effectInit({
            effect: "fade",
            swiper,
            on,
            setTranslate,
            setTransition,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: true,
                spaceBetween: 0,
                virtualTranslate: !swiper.params.cssMode
            })
        });
    }
    function initSliders() {
        if (document.querySelector(".reviews__slider")) new Swiper(".reviews__slider", {
            modules: [ Navigation, EffectFade, Autoplay ],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            effect: "fade",
            autoplay: {
                delay: 3e3,
                disableOnInteraction: false
            },
            navigation: {
                prevEl: ".reviews-button-prev",
                nextEl: ".reviews-button-next"
            },
            on: {}
        });
    }
    window.addEventListener("load", (function(e) {
        initSliders();
    }));
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function _defineProperty(obj, key, value) {
        if (key in obj) Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
        }); else obj[key] = value;
        return obj;
    }
    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter((function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            }));
            keys.push.apply(keys, symbols);
        }
        return keys;
    }
    function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) ownKeys(Object(source), true).forEach((function(key) {
                _defineProperty(target, key, source[key]);
            })); else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); else ownKeys(Object(source)).forEach((function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            }));
        }
        return target;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
    }
    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
    }
    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
        return _setPrototypeOf(o, p);
    }
    function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
            Date.prototype.toString.call(Reflect.construct(Date, [], (function() {})));
            return true;
        } catch (e) {
            return false;
        }
    }
    function _assertThisInitialized(self) {
        if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return self;
    }
    function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) return call;
        return _assertThisInitialized(self);
    }
    function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
            var result, Super = _getPrototypeOf(Derived);
            if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
            } else result = Super.apply(this, arguments);
            return _possibleConstructorReturn(this, result);
        };
    }
    function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null) break;
        }
        return object;
    }
    function _get(target, property, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.get) _get = Reflect.get; else _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) return desc.get.call(receiver);
            return desc.value;
        };
        return _get(target, property, receiver || target);
    }
    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }
    function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
    }
    function _iterableToArrayLimit(arr, i) {
        if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
            for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"] != null) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
    }
    function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var locomotive_scroll_esm_defaults = {
        el: document,
        name: "scroll",
        offset: [ 0, 0 ],
        repeat: false,
        smooth: false,
        initPosition: {
            x: 0,
            y: 0
        },
        direction: "vertical",
        gestureDirection: "vertical",
        reloadOnContextChange: false,
        lerp: .1,
        class: "is-inview",
        scrollbarContainer: false,
        scrollbarClass: "c-scrollbar",
        scrollingClass: "has-scroll-scrolling",
        draggingClass: "has-scroll-dragging",
        smoothClass: "has-scroll-smooth",
        initClass: "has-scroll-init",
        getSpeed: false,
        getDirection: false,
        scrollFromAnywhere: false,
        multiplier: 1,
        firefoxMultiplier: 50,
        touchMultiplier: 2,
        resetNativeScroll: true,
        tablet: {
            smooth: false,
            direction: "vertical",
            gestureDirection: "vertical",
            breakpoint: 1024
        },
        smartphone: {
            smooth: false,
            direction: "vertical",
            gestureDirection: "vertical"
        }
    };
    var _default = function() {
        function _default() {
            var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            _classCallCheck(this, _default);
            Object.assign(this, locomotive_scroll_esm_defaults, options);
            this.smartphone = locomotive_scroll_esm_defaults.smartphone;
            if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
            this.tablet = locomotive_scroll_esm_defaults.tablet;
            if (options.tablet) Object.assign(this.tablet, options.tablet);
            this.namespace = "locomotive";
            this.html = document.documentElement;
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth;
            this.windowMiddle = {
                x: this.windowWidth / 2,
                y: this.windowHeight / 2
            };
            this.els = {};
            this.currentElements = {};
            this.listeners = {};
            this.hasScrollTicking = false;
            this.hasCallEventSet = false;
            this.checkScroll = this.checkScroll.bind(this);
            this.checkResize = this.checkResize.bind(this);
            this.checkEvent = this.checkEvent.bind(this);
            this.instance = {
                scroll: {
                    x: 0,
                    y: 0
                },
                limit: {
                    x: this.html.offsetWidth,
                    y: this.html.offsetHeight
                },
                currentElements: this.currentElements
            };
            if (this.isMobile) if (this.isTablet) this.context = "tablet"; else this.context = "smartphone"; else this.context = "desktop";
            if (this.isMobile) this.direction = this[this.context].direction;
            if (this.direction === "horizontal") this.directionAxis = "x"; else this.directionAxis = "y";
            if (this.getDirection) this.instance.direction = null;
            if (this.getDirection) this.instance.speed = 0;
            this.html.classList.add(this.initClass);
            window.addEventListener("resize", this.checkResize, false);
        }
        _createClass(_default, [ {
            key: "init",
            value: function init() {
                this.initEvents();
            }
        }, {
            key: "checkScroll",
            value: function checkScroll() {
                this.dispatchScroll();
            }
        }, {
            key: "checkResize",
            value: function checkResize() {
                var _this = this;
                if (!this.resizeTick) {
                    this.resizeTick = true;
                    requestAnimationFrame((function() {
                        _this.resize();
                        _this.resizeTick = false;
                    }));
                }
            }
        }, {
            key: "resize",
            value: function resize() {}
        }, {
            key: "checkContext",
            value: function checkContext() {
                if (!this.reloadOnContextChange) return;
                this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1 || this.windowWidth < this.tablet.breakpoint;
                this.isTablet = this.isMobile && this.windowWidth >= this.tablet.breakpoint;
                var oldContext = this.context;
                if (this.isMobile) if (this.isTablet) this.context = "tablet"; else this.context = "smartphone"; else this.context = "desktop";
                if (oldContext != this.context) {
                    var oldSmooth = oldContext == "desktop" ? this.smooth : this[oldContext].smooth;
                    var newSmooth = this.context == "desktop" ? this.smooth : this[this.context].smooth;
                    if (oldSmooth != newSmooth) window.location.reload();
                }
            }
        }, {
            key: "initEvents",
            value: function initEvents() {
                var _this2 = this;
                this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]"));
                this.setScrollTo = this.setScrollTo.bind(this);
                this.scrollToEls.forEach((function(el) {
                    el.addEventListener("click", _this2.setScrollTo, false);
                }));
            }
        }, {
            key: "setScrollTo",
            value: function setScrollTo(event) {
                event.preventDefault();
                this.scrollTo(event.currentTarget.getAttribute("data-".concat(this.name, "-href")) || event.currentTarget.getAttribute("href"), {
                    offset: event.currentTarget.getAttribute("data-".concat(this.name, "-offset"))
                });
            }
        }, {
            key: "addElements",
            value: function addElements() {}
        }, {
            key: "detectElements",
            value: function detectElements(hasCallEventSet) {
                var _this3 = this;
                var scrollTop = this.instance.scroll.y;
                var scrollBottom = scrollTop + this.windowHeight;
                var scrollLeft = this.instance.scroll.x;
                var scrollRight = scrollLeft + this.windowWidth;
                Object.entries(this.els).forEach((function(_ref) {
                    var _ref2 = _slicedToArray(_ref, 2), i = _ref2[0], el = _ref2[1];
                    if (el && (!el.inView || hasCallEventSet)) if (_this3.direction === "horizontal") {
                        if (scrollRight >= el.left && scrollLeft < el.right) _this3.setInView(el, i);
                    } else if (scrollBottom >= el.top && scrollTop < el.bottom) _this3.setInView(el, i);
                    if (el && el.inView) if (_this3.direction === "horizontal") {
                        var width = el.right - el.left;
                        el.progress = (_this3.instance.scroll.x - (el.left - _this3.windowWidth)) / (width + _this3.windowWidth);
                        if (scrollRight < el.left || scrollLeft > el.right) _this3.setOutOfView(el, i);
                    } else {
                        var height = el.bottom - el.top;
                        el.progress = (_this3.instance.scroll.y - (el.top - _this3.windowHeight)) / (height + _this3.windowHeight);
                        if (scrollBottom < el.top || scrollTop > el.bottom) _this3.setOutOfView(el, i);
                    }
                }));
                this.hasScrollTicking = false;
            }
        }, {
            key: "setInView",
            value: function setInView(current, i) {
                this.els[i].inView = true;
                current.el.classList.add(current["class"]);
                this.currentElements[i] = current;
                if (current.call && this.hasCallEventSet) {
                    this.dispatchCall(current, "enter");
                    if (!current.repeat) this.els[i].call = false;
                }
            }
        }, {
            key: "setOutOfView",
            value: function setOutOfView(current, i) {
                var _this4 = this;
                this.els[i].inView = false;
                Object.keys(this.currentElements).forEach((function(el) {
                    el === i && delete _this4.currentElements[el];
                }));
                if (current.call && this.hasCallEventSet) this.dispatchCall(current, "exit");
                if (current.repeat) current.el.classList.remove(current["class"]);
            }
        }, {
            key: "dispatchCall",
            value: function dispatchCall(current, way) {
                this.callWay = way;
                this.callValue = current.call.split(",").map((function(item) {
                    return item.trim();
                }));
                this.callObj = current;
                if (this.callValue.length == 1) this.callValue = this.callValue[0];
                var callEvent = new Event(this.namespace + "call");
                this.el.dispatchEvent(callEvent);
            }
        }, {
            key: "dispatchScroll",
            value: function dispatchScroll() {
                var scrollEvent = new Event(this.namespace + "scroll");
                this.el.dispatchEvent(scrollEvent);
            }
        }, {
            key: "setEvents",
            value: function setEvents(event, func) {
                if (!this.listeners[event]) this.listeners[event] = [];
                var list = this.listeners[event];
                list.push(func);
                if (list.length === 1) this.el.addEventListener(this.namespace + event, this.checkEvent, false);
                if (event === "call") {
                    this.hasCallEventSet = true;
                    this.detectElements(true);
                }
            }
        }, {
            key: "unsetEvents",
            value: function unsetEvents(event, func) {
                if (!this.listeners[event]) return;
                var list = this.listeners[event];
                var index = list.indexOf(func);
                if (index < 0) return;
                list.splice(index, 1);
                if (list.index === 0) this.el.removeEventListener(this.namespace + event, this.checkEvent, false);
            }
        }, {
            key: "checkEvent",
            value: function checkEvent(event) {
                var _this5 = this;
                var name = event.type.replace(this.namespace, "");
                var list = this.listeners[name];
                if (!list || list.length === 0) return;
                list.forEach((function(func) {
                    switch (name) {
                      case "scroll":
                        return func(_this5.instance);

                      case "call":
                        return func(_this5.callValue, _this5.callWay, _this5.callObj);

                      default:
                        return func();
                    }
                }));
            }
        }, {
            key: "startScroll",
            value: function startScroll() {}
        }, {
            key: "stopScroll",
            value: function stopScroll() {}
        }, {
            key: "setScroll",
            value: function setScroll(x, y) {
                this.instance.scroll = {
                    x: 0,
                    y: 0
                };
            }
        }, {
            key: "destroy",
            value: function destroy() {
                var _this6 = this;
                window.removeEventListener("resize", this.checkResize, false);
                Object.keys(this.listeners).forEach((function(event) {
                    _this6.el.removeEventListener(_this6.namespace + event, _this6.checkEvent, false);
                }));
                this.listeners = {};
                this.scrollToEls.forEach((function(el) {
                    el.removeEventListener("click", _this6.setScrollTo, false);
                }));
                this.html.classList.remove(this.initClass);
            }
        } ]);
        return _default;
    }();
    var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : {};
    function createCommonjsModule(fn, module) {
        return module = {
            exports: {}
        }, fn(module, module.exports), module.exports;
    }
    var smoothscroll = createCommonjsModule((function(module, exports) {
        (function() {
            function polyfill() {
                var w = window;
                var d = document;
                if ("scrollBehavior" in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) return;
                var Element = w.HTMLElement || w.Element;
                var SCROLL_TIME = 468;
                var original = {
                    scroll: w.scroll || w.scrollTo,
                    scrollBy: w.scrollBy,
                    elementScroll: Element.prototype.scroll || scrollElement,
                    scrollIntoView: Element.prototype.scrollIntoView
                };
                var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;
                function isMicrosoftBrowser(userAgent) {
                    var userAgentPatterns = [ "MSIE ", "Trident/", "Edge/" ];
                    return new RegExp(userAgentPatterns.join("|")).test(userAgent);
                }
                var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;
                function scrollElement(x, y) {
                    this.scrollLeft = x;
                    this.scrollTop = y;
                }
                function ease(k) {
                    return .5 * (1 - Math.cos(Math.PI * k));
                }
                function shouldBailOut(firstArg) {
                    if (firstArg === null || typeof firstArg !== "object" || firstArg.behavior === void 0 || firstArg.behavior === "auto" || firstArg.behavior === "instant") return true;
                    if (typeof firstArg === "object" && firstArg.behavior === "smooth") return false;
                    throw new TypeError("behavior member of ScrollOptions " + firstArg.behavior + " is not a valid value for enumeration ScrollBehavior.");
                }
                function hasScrollableSpace(el, axis) {
                    if (axis === "Y") return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
                    if (axis === "X") return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
                }
                function canOverflow(el, axis) {
                    var overflowValue = w.getComputedStyle(el, null)["overflow" + axis];
                    return overflowValue === "auto" || overflowValue === "scroll";
                }
                function isScrollable(el) {
                    var isScrollableY = hasScrollableSpace(el, "Y") && canOverflow(el, "Y");
                    var isScrollableX = hasScrollableSpace(el, "X") && canOverflow(el, "X");
                    return isScrollableY || isScrollableX;
                }
                function findScrollableParent(el) {
                    while (el !== d.body && isScrollable(el) === false) el = el.parentNode || el.host;
                    return el;
                }
                function step(context) {
                    var time = now();
                    var value;
                    var currentX;
                    var currentY;
                    var elapsed = (time - context.startTime) / SCROLL_TIME;
                    elapsed = elapsed > 1 ? 1 : elapsed;
                    value = ease(elapsed);
                    currentX = context.startX + (context.x - context.startX) * value;
                    currentY = context.startY + (context.y - context.startY) * value;
                    context.method.call(context.scrollable, currentX, currentY);
                    if (currentX !== context.x || currentY !== context.y) w.requestAnimationFrame(step.bind(w, context));
                }
                function smoothScroll(el, x, y) {
                    var scrollable;
                    var startX;
                    var startY;
                    var method;
                    var startTime = now();
                    if (el === d.body) {
                        scrollable = w;
                        startX = w.scrollX || w.pageXOffset;
                        startY = w.scrollY || w.pageYOffset;
                        method = original.scroll;
                    } else {
                        scrollable = el;
                        startX = el.scrollLeft;
                        startY = el.scrollTop;
                        method = scrollElement;
                    }
                    step({
                        scrollable,
                        method,
                        startTime,
                        startX,
                        startY,
                        x,
                        y
                    });
                }
                w.scroll = w.scrollTo = function() {
                    if (arguments[0] === void 0) return;
                    if (shouldBailOut(arguments[0]) === true) {
                        original.scroll.call(w, arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] !== "object" ? arguments[0] : w.scrollX || w.pageXOffset, arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : w.scrollY || w.pageYOffset);
                        return;
                    }
                    smoothScroll.call(w, d.body, arguments[0].left !== void 0 ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== void 0 ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
                };
                w.scrollBy = function() {
                    if (arguments[0] === void 0) return;
                    if (shouldBailOut(arguments[0])) {
                        original.scrollBy.call(w, arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] !== "object" ? arguments[0] : 0, arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : 0);
                        return;
                    }
                    smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
                };
                Element.prototype.scroll = Element.prototype.scrollTo = function() {
                    if (arguments[0] === void 0) return;
                    if (shouldBailOut(arguments[0]) === true) {
                        if (typeof arguments[0] === "number" && arguments[1] === void 0) throw new SyntaxError("Value could not be converted");
                        original.elementScroll.call(this, arguments[0].left !== void 0 ? ~~arguments[0].left : typeof arguments[0] !== "object" ? ~~arguments[0] : this.scrollLeft, arguments[0].top !== void 0 ? ~~arguments[0].top : arguments[1] !== void 0 ? ~~arguments[1] : this.scrollTop);
                        return;
                    }
                    var left = arguments[0].left;
                    var top = arguments[0].top;
                    smoothScroll.call(this, this, typeof left === "undefined" ? this.scrollLeft : ~~left, typeof top === "undefined" ? this.scrollTop : ~~top);
                };
                Element.prototype.scrollBy = function() {
                    if (arguments[0] === void 0) return;
                    if (shouldBailOut(arguments[0]) === true) {
                        original.elementScroll.call(this, arguments[0].left !== void 0 ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== void 0 ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);
                        return;
                    }
                    this.scroll({
                        left: ~~arguments[0].left + this.scrollLeft,
                        top: ~~arguments[0].top + this.scrollTop,
                        behavior: arguments[0].behavior
                    });
                };
                Element.prototype.scrollIntoView = function() {
                    if (shouldBailOut(arguments[0]) === true) {
                        original.scrollIntoView.call(this, arguments[0] === void 0 ? true : arguments[0]);
                        return;
                    }
                    var scrollableParent = findScrollableParent(this);
                    var parentRects = scrollableParent.getBoundingClientRect();
                    var clientRects = this.getBoundingClientRect();
                    if (scrollableParent !== d.body) {
                        smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);
                        if (w.getComputedStyle(scrollableParent).position !== "fixed") w.scrollBy({
                            left: parentRects.left,
                            top: parentRects.top,
                            behavior: "smooth"
                        });
                    } else w.scrollBy({
                        left: clientRects.left,
                        top: clientRects.top,
                        behavior: "smooth"
                    });
                };
            }
            module.exports = {
                polyfill
            };
        })();
    }));
    smoothscroll.polyfill;
    var _default$1 = function(_Core) {
        _inherits(_default, _Core);
        var _super = _createSuper(_default);
        function _default() {
            var _this;
            var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            _classCallCheck(this, _default);
            _this = _super.call(this, options);
            if (_this.resetNativeScroll) {
                if (history.scrollRestoration) history.scrollRestoration = "manual";
                window.scrollTo(0, 0);
            }
            window.addEventListener("scroll", _this.checkScroll, false);
            if (window.smoothscrollPolyfill === void 0) {
                window.smoothscrollPolyfill = smoothscroll;
                window.smoothscrollPolyfill.polyfill();
            }
            return _this;
        }
        _createClass(_default, [ {
            key: "init",
            value: function init() {
                this.instance.scroll.y = window.pageYOffset;
                this.addElements();
                this.detectElements();
                _get(_getPrototypeOf(_default.prototype), "init", this).call(this);
            }
        }, {
            key: "checkScroll",
            value: function checkScroll() {
                var _this2 = this;
                _get(_getPrototypeOf(_default.prototype), "checkScroll", this).call(this);
                if (this.getDirection) this.addDirection();
                if (this.getSpeed) {
                    this.addSpeed();
                    this.speedTs = Date.now();
                }
                this.instance.scroll.y = window.pageYOffset;
                if (Object.entries(this.els).length) if (!this.hasScrollTicking) {
                    requestAnimationFrame((function() {
                        _this2.detectElements();
                    }));
                    this.hasScrollTicking = true;
                }
            }
        }, {
            key: "addDirection",
            value: function addDirection() {
                if (window.pageYOffset > this.instance.scroll.y) {
                    if (this.instance.direction !== "down") this.instance.direction = "down";
                } else if (window.pageYOffset < this.instance.scroll.y) if (this.instance.direction !== "up") this.instance.direction = "up";
            }
        }, {
            key: "addSpeed",
            value: function addSpeed() {
                if (window.pageYOffset != this.instance.scroll.y) this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / Math.max(1, Date.now() - this.speedTs); else this.instance.speed = 0;
            }
        }, {
            key: "resize",
            value: function resize() {
                if (Object.entries(this.els).length) {
                    this.windowHeight = window.innerHeight;
                    this.updateElements();
                }
            }
        }, {
            key: "addElements",
            value: function addElements() {
                var _this3 = this;
                this.els = {};
                var els = this.el.querySelectorAll("[data-" + this.name + "]");
                els.forEach((function(el, index) {
                    el.getBoundingClientRect();
                    var cl = el.dataset[_this3.name + "Class"] || _this3["class"];
                    var id = typeof el.dataset[_this3.name + "Id"] === "string" ? el.dataset[_this3.name + "Id"] : index;
                    var top;
                    var left;
                    var offset = typeof el.dataset[_this3.name + "Offset"] === "string" ? el.dataset[_this3.name + "Offset"].split(",") : _this3.offset;
                    var repeat = el.dataset[_this3.name + "Repeat"];
                    var call = el.dataset[_this3.name + "Call"];
                    var target = el.dataset[_this3.name + "Target"];
                    var targetEl;
                    if (target !== void 0) targetEl = document.querySelector("".concat(target)); else targetEl = el;
                    var targetElBCR = targetEl.getBoundingClientRect();
                    top = targetElBCR.top + _this3.instance.scroll.y;
                    left = targetElBCR.left + _this3.instance.scroll.x;
                    var bottom = top + targetEl.offsetHeight;
                    var right = left + targetEl.offsetWidth;
                    if (repeat == "false") repeat = false; else if (repeat != void 0) repeat = true; else repeat = _this3.repeat;
                    var relativeOffset = _this3.getRelativeOffset(offset);
                    top += relativeOffset[0];
                    bottom -= relativeOffset[1];
                    var mappedEl = {
                        el,
                        targetEl,
                        id,
                        class: cl,
                        top,
                        bottom,
                        left,
                        right,
                        offset,
                        progress: 0,
                        repeat,
                        inView: false,
                        call
                    };
                    _this3.els[id] = mappedEl;
                    if (el.classList.contains(cl)) _this3.setInView(_this3.els[id], id);
                }));
            }
        }, {
            key: "updateElements",
            value: function updateElements() {
                var _this4 = this;
                Object.entries(this.els).forEach((function(_ref) {
                    var _ref2 = _slicedToArray(_ref, 2), i = _ref2[0], el = _ref2[1];
                    var top = el.targetEl.getBoundingClientRect().top + _this4.instance.scroll.y;
                    var bottom = top + el.targetEl.offsetHeight;
                    var relativeOffset = _this4.getRelativeOffset(el.offset);
                    _this4.els[i].top = top + relativeOffset[0];
                    _this4.els[i].bottom = bottom - relativeOffset[1];
                }));
                this.hasScrollTicking = false;
            }
        }, {
            key: "getRelativeOffset",
            value: function getRelativeOffset(offset) {
                var relativeOffset = [ 0, 0 ];
                if (offset) for (var i = 0; i < offset.length; i++) if (typeof offset[i] == "string") if (offset[i].includes("%")) relativeOffset[i] = parseInt(offset[i].replace("%", "") * this.windowHeight / 100); else relativeOffset[i] = parseInt(offset[i]); else relativeOffset[i] = offset[i];
                return relativeOffset;
            }
        }, {
            key: "scrollTo",
            value: function scrollTo(target) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var offset = parseInt(options.offset) || 0;
                var callback = options.callback ? options.callback : false;
                if (typeof target === "string") if (target === "top") target = this.html; else if (target === "bottom") target = this.html.offsetHeight - window.innerHeight; else {
                    target = document.querySelector(target);
                    if (!target) return;
                } else if (typeof target === "number") target = parseInt(target); else if (target && target.tagName) ; else {
                    console.warn("`target` parameter is not valid");
                    return;
                }
                if (typeof target !== "number") offset = target.getBoundingClientRect().top + offset + this.instance.scroll.y; else offset = target + offset;
                var isTargetReached = function isTargetReached() {
                    return parseInt(window.pageYOffset) === parseInt(offset);
                };
                if (callback) if (isTargetReached()) {
                    callback();
                    return;
                } else {
                    var onScroll = function onScroll() {
                        if (isTargetReached()) {
                            window.removeEventListener("scroll", onScroll);
                            callback();
                        }
                    };
                    window.addEventListener("scroll", onScroll);
                }
                window.scrollTo({
                    top: offset,
                    behavior: options.duration === 0 ? "auto" : "smooth"
                });
            }
        }, {
            key: "update",
            value: function update() {
                this.addElements();
                this.detectElements();
            }
        }, {
            key: "destroy",
            value: function destroy() {
                _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);
                window.removeEventListener("scroll", this.checkScroll, false);
            }
        } ]);
        return _default;
    }(_default);
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var locomotive_scroll_esm_hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
        if (val === null || val === void 0) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(val);
    }
    function shouldUseNative() {
        try {
            if (!Object.assign) return false;
            var test1 = new String("abc");
            test1[5] = "de";
            if (Object.getOwnPropertyNames(test1)[0] === "5") return false;
            var test2 = {};
            for (var i = 0; i < 10; i++) test2["_" + String.fromCharCode(i)] = i;
            var order2 = Object.getOwnPropertyNames(test2).map((function(n) {
                return test2[n];
            }));
            if (order2.join("") !== "0123456789") return false;
            var test3 = {};
            "abcdefghijklmnopqrst".split("").forEach((function(letter) {
                test3[letter] = letter;
            }));
            if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") return false;
            return true;
        } catch (err) {
            return false;
        }
    }
    var objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
            from = Object(arguments[s]);
            for (var key in from) if (locomotive_scroll_esm_hasOwnProperty.call(from, key)) to[key] = from[key];
            if (getOwnPropertySymbols) {
                symbols = getOwnPropertySymbols(from);
                for (var i = 0; i < symbols.length; i++) if (propIsEnumerable.call(from, symbols[i])) to[symbols[i]] = from[symbols[i]];
            }
        }
        return to;
    };
    function E() {}
    E.prototype = {
        on: function(name, callback, ctx) {
            var e = this.e || (this.e = {});
            (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx
            });
            return this;
        },
        once: function(name, callback, ctx) {
            var self = this;
            function listener() {
                self.off(name, listener);
                callback.apply(ctx, arguments);
            }
            listener._ = callback;
            return this.on(name, listener, ctx);
        },
        emit: function(name) {
            var data = [].slice.call(arguments, 1);
            var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
            var i = 0;
            var len = evtArr.length;
            for (i; i < len; i++) evtArr[i].fn.apply(evtArr[i].ctx, data);
            return this;
        },
        off: function(name, callback) {
            var e = this.e || (this.e = {});
            var evts = e[name];
            var liveEvents = [];
            if (evts && callback) for (var i = 0, len = evts.length; i < len; i++) if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
            liveEvents.length ? e[name] = liveEvents : delete e[name];
            return this;
        }
    };
    var tinyEmitter = E;
    var lethargy = createCommonjsModule((function(module, exports) {
        (function() {
            var root;
            root = exports !== null ? exports : this;
            root.Lethargy = function() {
                function Lethargy(stability, sensitivity, tolerance, delay) {
                    this.stability = stability != null ? Math.abs(stability) : 8;
                    this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
                    this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
                    this.delay = delay != null ? delay : 150;
                    this.lastUpDeltas = function() {
                        var i, ref, results;
                        results = [];
                        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) results.push(null);
                        return results;
                    }.call(this);
                    this.lastDownDeltas = function() {
                        var i, ref, results;
                        results = [];
                        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) results.push(null);
                        return results;
                    }.call(this);
                    this.deltasTimestamp = function() {
                        var i, ref, results;
                        results = [];
                        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) results.push(null);
                        return results;
                    }.call(this);
                }
                Lethargy.prototype.check = function(e) {
                    var lastDelta;
                    e = e.originalEvent || e;
                    if (e.wheelDelta != null) lastDelta = e.wheelDelta; else if (e.deltaY != null) lastDelta = e.deltaY * -40; else if (e.detail != null || e.detail === 0) lastDelta = e.detail * -40;
                    this.deltasTimestamp.push(Date.now());
                    this.deltasTimestamp.shift();
                    if (lastDelta > 0) {
                        this.lastUpDeltas.push(lastDelta);
                        this.lastUpDeltas.shift();
                        return this.isInertia(1);
                    } else {
                        this.lastDownDeltas.push(lastDelta);
                        this.lastDownDeltas.shift();
                        return this.isInertia(-1);
                    }
                };
                Lethargy.prototype.isInertia = function(direction) {
                    var lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;
                    lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
                    if (lastDeltas[0] === null) return direction;
                    if (this.deltasTimestamp[this.stability * 2 - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[this.stability * 2 - 1]) return false;
                    lastDeltasOld = lastDeltas.slice(0, this.stability);
                    lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
                    oldSum = lastDeltasOld.reduce((function(t, s) {
                        return t + s;
                    }));
                    newSum = lastDeltasNew.reduce((function(t, s) {
                        return t + s;
                    }));
                    oldAverage = oldSum / lastDeltasOld.length;
                    newAverage = newSum / lastDeltasNew.length;
                    if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && this.sensitivity < Math.abs(newAverage)) return direction; else return false;
                };
                Lethargy.prototype.showLastUpDeltas = function() {
                    return this.lastUpDeltas;
                };
                Lethargy.prototype.showLastDownDeltas = function() {
                    return this.lastDownDeltas;
                };
                return Lethargy;
            }();
        }).call(commonjsGlobal);
    }));
    var locomotive_scroll_esm_support = function getSupport() {
        return {
            hasWheelEvent: "onwheel" in document,
            hasMouseWheelEvent: "onmousewheel" in document,
            hasTouch: "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch,
            hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
            hasPointer: !!window.navigator.msPointerEnabled,
            hasKeyDown: "onkeydown" in document,
            isFirefox: navigator.userAgent.indexOf("Firefox") > -1
        };
    }();
    var locomotive_scroll_esm_toString = Object.prototype.toString, hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    var bindallStandalone = function(object) {
        if (!object) return console.warn("bindAll requires at least one argument.");
        var functions = Array.prototype.slice.call(arguments, 1);
        if (functions.length === 0) for (var method in object) if (hasOwnProperty$1.call(object, method)) if (typeof object[method] == "function" && locomotive_scroll_esm_toString.call(object[method]) == "[object Function]") functions.push(method);
        for (var i = 0; i < functions.length; i++) {
            var f = functions[i];
            object[f] = bind(object[f], object);
        }
    };
    function bind(func, context) {
        return function() {
            return func.apply(context, arguments);
        };
    }
    var Lethargy = lethargy.Lethargy;
    var EVT_ID = "virtualscroll";
    var src = VirtualScroll;
    var keyCodes = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32
    };
    function VirtualScroll(options) {
        bindallStandalone(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown");
        this.el = window;
        if (options && options.el) {
            this.el = options.el;
            delete options.el;
        }
        this.options = objectAssign({
            mouseMultiplier: 1,
            touchMultiplier: 2,
            firefoxMultiplier: 15,
            keyStep: 120,
            preventTouch: false,
            unpreventTouchClass: "vs-touchmove-allowed",
            limitInertia: false,
            useKeyboard: true,
            useTouch: true
        }, options);
        if (this.options.limitInertia) this._lethargy = new Lethargy;
        this._emitter = new tinyEmitter;
        this._event = {
            y: 0,
            x: 0,
            deltaX: 0,
            deltaY: 0
        };
        this.touchStartX = null;
        this.touchStartY = null;
        this.bodyTouchAction = null;
        if (this.options.passive !== void 0) this.listenerOptions = {
            passive: this.options.passive
        };
    }
    VirtualScroll.prototype._notify = function(e) {
        var evt = this._event;
        evt.x += evt.deltaX;
        evt.y += evt.deltaY;
        this._emitter.emit(EVT_ID, {
            x: evt.x,
            y: evt.y,
            deltaX: evt.deltaX,
            deltaY: evt.deltaY,
            originalEvent: e
        });
    };
    VirtualScroll.prototype._onWheel = function(e) {
        var options = this.options;
        if (this._lethargy && this._lethargy.check(e) === false) return;
        var evt = this._event;
        evt.deltaX = e.wheelDeltaX || e.deltaX * -1;
        evt.deltaY = e.wheelDeltaY || e.deltaY * -1;
        if (locomotive_scroll_esm_support.isFirefox && e.deltaMode == 1) {
            evt.deltaX *= options.firefoxMultiplier;
            evt.deltaY *= options.firefoxMultiplier;
        }
        evt.deltaX *= options.mouseMultiplier;
        evt.deltaY *= options.mouseMultiplier;
        this._notify(e);
    };
    VirtualScroll.prototype._onMouseWheel = function(e) {
        if (this.options.limitInertia && this._lethargy.check(e) === false) return;
        var evt = this._event;
        evt.deltaX = e.wheelDeltaX ? e.wheelDeltaX : 0;
        evt.deltaY = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta;
        this._notify(e);
    };
    VirtualScroll.prototype._onTouchStart = function(e) {
        var t = e.targetTouches ? e.targetTouches[0] : e;
        this.touchStartX = t.pageX;
        this.touchStartY = t.pageY;
    };
    VirtualScroll.prototype._onTouchMove = function(e) {
        var options = this.options;
        if (options.preventTouch && !e.target.classList.contains(options.unpreventTouchClass)) e.preventDefault();
        var evt = this._event;
        var t = e.targetTouches ? e.targetTouches[0] : e;
        evt.deltaX = (t.pageX - this.touchStartX) * options.touchMultiplier;
        evt.deltaY = (t.pageY - this.touchStartY) * options.touchMultiplier;
        this.touchStartX = t.pageX;
        this.touchStartY = t.pageY;
        this._notify(e);
    };
    VirtualScroll.prototype._onKeyDown = function(e) {
        var evt = this._event;
        evt.deltaX = evt.deltaY = 0;
        var windowHeight = window.innerHeight - 40;
        switch (e.keyCode) {
          case keyCodes.LEFT:
          case keyCodes.UP:
            evt.deltaY = this.options.keyStep;
            break;

          case keyCodes.RIGHT:
          case keyCodes.DOWN:
            evt.deltaY = -this.options.keyStep;
            break;

          case e.shiftKey:
            evt.deltaY = windowHeight;
            break;

          case keyCodes.SPACE:
            evt.deltaY = -windowHeight;
            break;

          default:
            return;
        }
        this._notify(e);
    };
    VirtualScroll.prototype._bind = function() {
        if (locomotive_scroll_esm_support.hasWheelEvent) this.el.addEventListener("wheel", this._onWheel, this.listenerOptions);
        if (locomotive_scroll_esm_support.hasMouseWheelEvent) this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions);
        if (locomotive_scroll_esm_support.hasTouch && this.options.useTouch) {
            this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions);
            this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions);
        }
        if (locomotive_scroll_esm_support.hasPointer && locomotive_scroll_esm_support.hasTouchWin) {
            this.bodyTouchAction = document.body.style.msTouchAction;
            document.body.style.msTouchAction = "none";
            this.el.addEventListener("MSPointerDown", this._onTouchStart, true);
            this.el.addEventListener("MSPointerMove", this._onTouchMove, true);
        }
        if (locomotive_scroll_esm_support.hasKeyDown && this.options.useKeyboard) document.addEventListener("keydown", this._onKeyDown);
    };
    VirtualScroll.prototype._unbind = function() {
        if (locomotive_scroll_esm_support.hasWheelEvent) this.el.removeEventListener("wheel", this._onWheel);
        if (locomotive_scroll_esm_support.hasMouseWheelEvent) this.el.removeEventListener("mousewheel", this._onMouseWheel);
        if (locomotive_scroll_esm_support.hasTouch) {
            this.el.removeEventListener("touchstart", this._onTouchStart);
            this.el.removeEventListener("touchmove", this._onTouchMove);
        }
        if (locomotive_scroll_esm_support.hasPointer && locomotive_scroll_esm_support.hasTouchWin) {
            document.body.style.msTouchAction = this.bodyTouchAction;
            this.el.removeEventListener("MSPointerDown", this._onTouchStart, true);
            this.el.removeEventListener("MSPointerMove", this._onTouchMove, true);
        }
        if (locomotive_scroll_esm_support.hasKeyDown && this.options.useKeyboard) document.removeEventListener("keydown", this._onKeyDown);
    };
    VirtualScroll.prototype.on = function(cb, ctx) {
        this._emitter.on(EVT_ID, cb, ctx);
        var events = this._emitter.e;
        if (events && events[EVT_ID] && events[EVT_ID].length === 1) this._bind();
    };
    VirtualScroll.prototype.off = function(cb, ctx) {
        this._emitter.off(EVT_ID, cb, ctx);
        var events = this._emitter.e;
        if (!events[EVT_ID] || events[EVT_ID].length <= 0) this._unbind();
    };
    VirtualScroll.prototype.reset = function() {
        var evt = this._event;
        evt.x = 0;
        evt.y = 0;
    };
    VirtualScroll.prototype.destroy = function() {
        this._emitter.off();
        this._unbind();
    };
    function lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }
    function locomotive_scroll_esm_getTranslate(el) {
        var translate = {};
        if (!window.getComputedStyle) return;
        var style = getComputedStyle(el);
        var transform = style.transform || style.webkitTransform || style.mozTransform;
        var mat = transform.match(/^matrix3d\((.+)\)$/);
        if (mat) {
            translate.x = mat ? parseFloat(mat[1].split(", ")[12]) : 0;
            translate.y = mat ? parseFloat(mat[1].split(", ")[13]) : 0;
        } else {
            mat = transform.match(/^matrix\((.+)\)$/);
            translate.x = mat ? parseFloat(mat[1].split(", ")[4]) : 0;
            translate.y = mat ? parseFloat(mat[1].split(", ")[5]) : 0;
        }
        return translate;
    }
    function getParents(elem) {
        var parents = [];
        for (;elem && elem !== document; elem = elem.parentNode) parents.push(elem);
        return parents;
    }
    var NEWTON_ITERATIONS = 4;
    var NEWTON_MIN_SLOPE = .001;
    var SUBDIVISION_PRECISION = 1e-7;
    var SUBDIVISION_MAX_ITERATIONS = 10;
    var kSplineTableSize = 11;
    var kSampleStepSize = 1 / (kSplineTableSize - 1);
    var float32ArraySupported = typeof Float32Array === "function";
    function A(aA1, aA2) {
        return 1 - 3 * aA2 + 3 * aA1;
    }
    function B(aA1, aA2) {
        return 3 * aA2 - 6 * aA1;
    }
    function C(aA1) {
        return 3 * aA1;
    }
    function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
        return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
    }
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX, currentT, i = 0;
        do {
            currentT = aA + (aB - aA) / 2;
            currentX = calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0) aB = currentT; else aA = currentT;
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
        return currentT;
    }
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
            var currentSlope = getSlope(aGuessT, mX1, mX2);
            if (currentSlope === 0) return aGuessT;
            var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
    }
    function LinearEasing(x) {
        return x;
    }
    var src$1 = function bezier(mX1, mY1, mX2, mY2) {
        if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) throw new Error("bezier x values must be in [0, 1] range");
        if (mX1 === mY1 && mX2 === mY2) return LinearEasing;
        var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
        for (var i = 0; i < kSplineTableSize; ++i) sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        function getTForX(aX) {
            var intervalStart = 0;
            var currentSample = 1;
            var lastSample = kSplineTableSize - 1;
            for (;currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) intervalStart += kSampleStepSize;
            --currentSample;
            var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
            var guessForT = intervalStart + dist * kSampleStepSize;
            var initialSlope = getSlope(guessForT, mX1, mX2);
            if (initialSlope >= NEWTON_MIN_SLOPE) return newtonRaphsonIterate(aX, guessForT, mX1, mX2); else if (initialSlope === 0) return guessForT; else return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
        return function BezierEasing(x) {
            if (x === 0) return 0;
            if (x === 1) return 1;
            return calcBezier(getTForX(x), mY1, mY2);
        };
    };
    var keyCodes$1 = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32,
        TAB: 9,
        PAGEUP: 33,
        PAGEDOWN: 34,
        HOME: 36,
        END: 35
    };
    var _default$2 = function(_Core) {
        _inherits(_default, _Core);
        var _super = _createSuper(_default);
        function _default() {
            var _this;
            var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            _classCallCheck(this, _default);
            if (history.scrollRestoration) history.scrollRestoration = "manual";
            window.scrollTo(0, 0);
            _this = _super.call(this, options);
            if (_this.inertia) _this.lerp = _this.inertia * .1;
            _this.isScrolling = false;
            _this.isDraggingScrollbar = false;
            _this.isTicking = false;
            _this.hasScrollTicking = false;
            _this.parallaxElements = {};
            _this.stop = false;
            _this.scrollbarContainer = options.scrollbarContainer;
            _this.checkKey = _this.checkKey.bind(_assertThisInitialized(_this));
            window.addEventListener("keydown", _this.checkKey, false);
            return _this;
        }
        _createClass(_default, [ {
            key: "init",
            value: function init() {
                var _this2 = this;
                this.html.classList.add(this.smoothClass);
                this.html.setAttribute("data-".concat(this.name, "-direction"), this.direction);
                this.instance = _objectSpread2({
                    delta: {
                        x: this.initPosition.x,
                        y: this.initPosition.y
                    },
                    scroll: {
                        x: this.initPosition.x,
                        y: this.initPosition.y
                    }
                }, this.instance);
                this.vs = new src({
                    el: this.scrollFromAnywhere ? document : this.el,
                    mouseMultiplier: navigator.platform.indexOf("Win") > -1 ? 1 : .4,
                    firefoxMultiplier: this.firefoxMultiplier,
                    touchMultiplier: this.touchMultiplier,
                    useKeyboard: false,
                    passive: true
                });
                this.vs.on((function(e) {
                    if (_this2.stop) return;
                    if (!_this2.isDraggingScrollbar) requestAnimationFrame((function() {
                        _this2.updateDelta(e);
                        if (!_this2.isScrolling) _this2.startScrolling();
                    }));
                }));
                this.setScrollLimit();
                this.initScrollBar();
                this.addSections();
                this.addElements();
                this.checkScroll(true);
                this.transformElements(true, true);
                _get(_getPrototypeOf(_default.prototype), "init", this).call(this);
            }
        }, {
            key: "setScrollLimit",
            value: function setScrollLimit() {
                this.instance.limit.y = this.el.offsetHeight - this.windowHeight;
                if (this.direction === "horizontal") {
                    var totalWidth = 0;
                    var nodes = this.el.children;
                    for (var i = 0; i < nodes.length; i++) totalWidth += nodes[i].offsetWidth;
                    this.instance.limit.x = totalWidth - this.windowWidth;
                }
            }
        }, {
            key: "startScrolling",
            value: function startScrolling() {
                this.startScrollTs = Date.now();
                this.isScrolling = true;
                this.checkScroll();
                this.html.classList.add(this.scrollingClass);
            }
        }, {
            key: "stopScrolling",
            value: function stopScrolling() {
                cancelAnimationFrame(this.checkScrollRaf);
                this.startScrollTs = void 0;
                if (this.scrollToRaf) {
                    cancelAnimationFrame(this.scrollToRaf);
                    this.scrollToRaf = null;
                }
                this.isScrolling = false;
                this.instance.scroll.y = Math.round(this.instance.scroll.y);
                this.html.classList.remove(this.scrollingClass);
            }
        }, {
            key: "checkKey",
            value: function checkKey(e) {
                var _this3 = this;
                if (this.stop) {
                    if (e.keyCode == keyCodes$1.TAB) requestAnimationFrame((function() {
                        _this3.html.scrollTop = 0;
                        document.body.scrollTop = 0;
                        _this3.html.scrollLeft = 0;
                        document.body.scrollLeft = 0;
                    }));
                    return;
                }
                switch (e.keyCode) {
                  case keyCodes$1.TAB:
                    requestAnimationFrame((function() {
                        _this3.html.scrollTop = 0;
                        document.body.scrollTop = 0;
                        _this3.html.scrollLeft = 0;
                        document.body.scrollLeft = 0;
                        _this3.scrollTo(document.activeElement, {
                            offset: -window.innerHeight / 2
                        });
                    }));
                    break;

                  case keyCodes$1.UP:
                    if (this.isActiveElementScrollSensitive()) this.instance.delta[this.directionAxis] -= 240;
                    break;

                  case keyCodes$1.DOWN:
                    if (this.isActiveElementScrollSensitive()) this.instance.delta[this.directionAxis] += 240;
                    break;

                  case keyCodes$1.PAGEUP:
                    this.instance.delta[this.directionAxis] -= window.innerHeight;
                    break;

                  case keyCodes$1.PAGEDOWN:
                    this.instance.delta[this.directionAxis] += window.innerHeight;
                    break;

                  case keyCodes$1.HOME:
                    this.instance.delta[this.directionAxis] -= this.instance.limit[this.directionAxis];
                    break;

                  case keyCodes$1.END:
                    this.instance.delta[this.directionAxis] += this.instance.limit[this.directionAxis];
                    break;

                  case keyCodes$1.SPACE:
                    if (this.isActiveElementScrollSensitive()) if (e.shiftKey) this.instance.delta[this.directionAxis] -= window.innerHeight; else this.instance.delta[this.directionAxis] += window.innerHeight;
                    break;

                  default:
                    return;
                }
                if (this.instance.delta[this.directionAxis] < 0) this.instance.delta[this.directionAxis] = 0;
                if (this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis]) this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis];
                this.stopScrolling();
                this.isScrolling = true;
                this.checkScroll();
                this.html.classList.add(this.scrollingClass);
            }
        }, {
            key: "isActiveElementScrollSensitive",
            value: function isActiveElementScrollSensitive() {
                return !(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement) && !(document.activeElement instanceof HTMLButtonElement) && !(document.activeElement instanceof HTMLSelectElement);
            }
        }, {
            key: "checkScroll",
            value: function checkScroll() {
                var _this4 = this;
                var forced = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
                if (forced || this.isScrolling || this.isDraggingScrollbar) {
                    if (!this.hasScrollTicking) {
                        this.checkScrollRaf = requestAnimationFrame((function() {
                            return _this4.checkScroll();
                        }));
                        this.hasScrollTicking = true;
                    }
                    this.updateScroll();
                    var distance = Math.abs(this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]);
                    var timeSinceStart = Date.now() - this.startScrollTs;
                    if (!this.animatingScroll && timeSinceStart > 100 && (distance < .5 && this.instance.delta[this.directionAxis] != 0 || distance < .5 && this.instance.delta[this.directionAxis] == 0)) this.stopScrolling();
                    Object.entries(this.sections).forEach((function(_ref) {
                        var _ref2 = _slicedToArray(_ref, 2), section = (_ref2[0], _ref2[1]);
                        if (section.persistent || _this4.instance.scroll[_this4.directionAxis] > section.offset[_this4.directionAxis] && _this4.instance.scroll[_this4.directionAxis] < section.limit[_this4.directionAxis]) {
                            if (_this4.direction === "horizontal") _this4.transform(section.el, -_this4.instance.scroll[_this4.directionAxis], 0); else _this4.transform(section.el, 0, -_this4.instance.scroll[_this4.directionAxis]);
                            if (!section.inView) {
                                section.inView = true;
                                section.el.style.opacity = 1;
                                section.el.style.pointerEvents = "all";
                                section.el.setAttribute("data-".concat(_this4.name, "-section-inview"), "");
                            }
                        } else {
                            if (section.inView || forced) {
                                section.inView = false;
                                section.el.style.opacity = 0;
                                section.el.style.pointerEvents = "none";
                                section.el.removeAttribute("data-".concat(_this4.name, "-section-inview"));
                            }
                            _this4.transform(section.el, 0, 0);
                        }
                    }));
                    if (this.getDirection) this.addDirection();
                    if (this.getSpeed) {
                        this.addSpeed();
                        this.speedTs = Date.now();
                    }
                    this.detectElements();
                    this.transformElements();
                    if (this.hasScrollbar) {
                        var scrollBarTranslation = this.instance.scroll[this.directionAxis] / this.instance.limit[this.directionAxis] * this.scrollBarLimit[this.directionAxis];
                        if (this.direction === "horizontal") this.transform(this.scrollbarThumb, scrollBarTranslation, 0); else this.transform(this.scrollbarThumb, 0, scrollBarTranslation);
                    }
                    _get(_getPrototypeOf(_default.prototype), "checkScroll", this).call(this);
                    this.hasScrollTicking = false;
                }
            }
        }, {
            key: "resize",
            value: function resize() {
                this.windowHeight = window.innerHeight;
                this.windowWidth = window.innerWidth;
                this.checkContext();
                this.windowMiddle = {
                    x: this.windowWidth / 2,
                    y: this.windowHeight / 2
                };
                this.update();
            }
        }, {
            key: "updateDelta",
            value: function updateDelta(e) {
                var delta;
                var gestureDirection = this[this.context] && this[this.context].gestureDirection ? this[this.context].gestureDirection : this.gestureDirection;
                if (gestureDirection === "both") delta = e.deltaX + e.deltaY; else if (gestureDirection === "vertical") delta = e.deltaY; else if (gestureDirection === "horizontal") delta = e.deltaX; else delta = e.deltaY;
                this.instance.delta[this.directionAxis] -= delta * this.multiplier;
                if (this.instance.delta[this.directionAxis] < 0) this.instance.delta[this.directionAxis] = 0;
                if (this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis]) this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis];
            }
        }, {
            key: "updateScroll",
            value: function updateScroll(e) {
                if (this.isScrolling || this.isDraggingScrollbar) this.instance.scroll[this.directionAxis] = lerp(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis], this.lerp); else if (this.instance.scroll[this.directionAxis] > this.instance.limit[this.directionAxis]) this.setScroll(this.instance.scroll[this.directionAxis], this.instance.limit[this.directionAxis]); else if (this.instance.scroll.y < 0) this.setScroll(this.instance.scroll[this.directionAxis], 0); else this.setScroll(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis]);
            }
        }, {
            key: "addDirection",
            value: function addDirection() {
                if (this.instance.delta.y > this.instance.scroll.y) {
                    if (this.instance.direction !== "down") this.instance.direction = "down";
                } else if (this.instance.delta.y < this.instance.scroll.y) if (this.instance.direction !== "up") this.instance.direction = "up";
                if (this.instance.delta.x > this.instance.scroll.x) {
                    if (this.instance.direction !== "right") this.instance.direction = "right";
                } else if (this.instance.delta.x < this.instance.scroll.x) if (this.instance.direction !== "left") this.instance.direction = "left";
            }
        }, {
            key: "addSpeed",
            value: function addSpeed() {
                if (this.instance.delta[this.directionAxis] != this.instance.scroll[this.directionAxis]) this.instance.speed = (this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]) / Math.max(1, Date.now() - this.speedTs); else this.instance.speed = 0;
            }
        }, {
            key: "initScrollBar",
            value: function initScrollBar() {
                this.scrollbar = document.createElement("span");
                this.scrollbarThumb = document.createElement("span");
                this.scrollbar.classList.add("".concat(this.scrollbarClass));
                this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb"));
                this.scrollbar.append(this.scrollbarThumb);
                if (this.scrollbarContainer) this.scrollbarContainer.append(this.scrollbar); else document.body.append(this.scrollbar);
                this.getScrollBar = this.getScrollBar.bind(this);
                this.releaseScrollBar = this.releaseScrollBar.bind(this);
                this.moveScrollBar = this.moveScrollBar.bind(this);
                this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar);
                window.addEventListener("mouseup", this.releaseScrollBar);
                window.addEventListener("mousemove", this.moveScrollBar);
                this.hasScrollbar = false;
                if (this.direction == "horizontal") {
                    if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
                } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                this.hasScrollbar = true;
                this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
                this.scrollbarHeight = this.scrollbarBCR.height;
                this.scrollbarWidth = this.scrollbarBCR.width;
                if (this.direction === "horizontal") this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px"); else this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px");
                this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect();
                this.scrollBarLimit = {
                    x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                    y: this.scrollbarHeight - this.scrollbarThumbBCR.height
                };
            }
        }, {
            key: "reinitScrollBar",
            value: function reinitScrollBar() {
                this.hasScrollbar = false;
                if (this.direction == "horizontal") {
                    if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
                } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                this.hasScrollbar = true;
                this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
                this.scrollbarHeight = this.scrollbarBCR.height;
                this.scrollbarWidth = this.scrollbarBCR.width;
                if (this.direction === "horizontal") this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px"); else this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px");
                this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect();
                this.scrollBarLimit = {
                    x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                    y: this.scrollbarHeight - this.scrollbarThumbBCR.height
                };
            }
        }, {
            key: "destroyScrollBar",
            value: function destroyScrollBar() {
                this.scrollbarThumb.removeEventListener("mousedown", this.getScrollBar);
                window.removeEventListener("mouseup", this.releaseScrollBar);
                window.removeEventListener("mousemove", this.moveScrollBar);
                this.scrollbar.remove();
            }
        }, {
            key: "getScrollBar",
            value: function getScrollBar(e) {
                this.isDraggingScrollbar = true;
                this.checkScroll();
                this.html.classList.remove(this.scrollingClass);
                this.html.classList.add(this.draggingClass);
            }
        }, {
            key: "releaseScrollBar",
            value: function releaseScrollBar(e) {
                this.isDraggingScrollbar = false;
                if (this.isScrolling) this.html.classList.add(this.scrollingClass);
                this.html.classList.remove(this.draggingClass);
            }
        }, {
            key: "moveScrollBar",
            value: function moveScrollBar(e) {
                var _this5 = this;
                if (this.isDraggingScrollbar) requestAnimationFrame((function() {
                    var x = (e.clientX - _this5.scrollbarBCR.left) * 100 / _this5.scrollbarWidth * _this5.instance.limit.x / 100;
                    var y = (e.clientY - _this5.scrollbarBCR.top) * 100 / _this5.scrollbarHeight * _this5.instance.limit.y / 100;
                    if (y > 0 && y < _this5.instance.limit.y) _this5.instance.delta.y = y;
                    if (x > 0 && x < _this5.instance.limit.x) _this5.instance.delta.x = x;
                }));
            }
        }, {
            key: "addElements",
            value: function addElements() {
                var _this6 = this;
                this.els = {};
                this.parallaxElements = {};
                var els = this.el.querySelectorAll("[data-".concat(this.name, "]"));
                els.forEach((function(el, index) {
                    var targetParents = getParents(el);
                    var section = Object.entries(_this6.sections).map((function(_ref3) {
                        var _ref4 = _slicedToArray(_ref3, 2), section = (_ref4[0], _ref4[1]);
                        return section;
                    })).find((function(section) {
                        return targetParents.includes(section.el);
                    }));
                    var cl = el.dataset[_this6.name + "Class"] || _this6["class"];
                    var id = typeof el.dataset[_this6.name + "Id"] === "string" ? el.dataset[_this6.name + "Id"] : "el" + index;
                    var top;
                    var left;
                    var repeat = el.dataset[_this6.name + "Repeat"];
                    var call = el.dataset[_this6.name + "Call"];
                    var position = el.dataset[_this6.name + "Position"];
                    var delay = el.dataset[_this6.name + "Delay"];
                    var direction = el.dataset[_this6.name + "Direction"];
                    var sticky = typeof el.dataset[_this6.name + "Sticky"] === "string";
                    var speed = el.dataset[_this6.name + "Speed"] ? parseFloat(el.dataset[_this6.name + "Speed"]) / 10 : false;
                    var offset = typeof el.dataset[_this6.name + "Offset"] === "string" ? el.dataset[_this6.name + "Offset"].split(",") : _this6.offset;
                    var target = el.dataset[_this6.name + "Target"];
                    var targetEl;
                    if (target !== void 0) targetEl = document.querySelector("".concat(target)); else targetEl = el;
                    var targetElBCR = targetEl.getBoundingClientRect();
                    if (section === null) {
                        top = targetElBCR.top + _this6.instance.scroll.y - locomotive_scroll_esm_getTranslate(targetEl).y;
                        left = targetElBCR.left + _this6.instance.scroll.x - locomotive_scroll_esm_getTranslate(targetEl).x;
                    } else if (!section.inView) {
                        top = targetElBCR.top - locomotive_scroll_esm_getTranslate(section.el).y - locomotive_scroll_esm_getTranslate(targetEl).y;
                        left = targetElBCR.left - locomotive_scroll_esm_getTranslate(section.el).x - locomotive_scroll_esm_getTranslate(targetEl).x;
                    } else {
                        top = targetElBCR.top + _this6.instance.scroll.y - locomotive_scroll_esm_getTranslate(targetEl).y;
                        left = targetElBCR.left + _this6.instance.scroll.x - locomotive_scroll_esm_getTranslate(targetEl).x;
                    }
                    var bottom = top + targetEl.offsetHeight;
                    var right = left + targetEl.offsetWidth;
                    var middle = {
                        x: (right - left) / 2 + left,
                        y: (bottom - top) / 2 + top
                    };
                    if (sticky) {
                        var elBCR = el.getBoundingClientRect();
                        var elTop = elBCR.top;
                        var elLeft = elBCR.left;
                        var elDistance = {
                            x: elLeft - left,
                            y: elTop - top
                        };
                        top += window.innerHeight;
                        left += window.innerWidth;
                        bottom = elTop + targetEl.offsetHeight - el.offsetHeight - elDistance[_this6.directionAxis];
                        right = elLeft + targetEl.offsetWidth - el.offsetWidth - elDistance[_this6.directionAxis];
                        middle = {
                            x: (right - left) / 2 + left,
                            y: (bottom - top) / 2 + top
                        };
                    }
                    if (repeat == "false") repeat = false; else if (repeat != void 0) repeat = true; else repeat = _this6.repeat;
                    var relativeOffset = [ 0, 0 ];
                    if (offset) if (_this6.direction === "horizontal") {
                        for (var i = 0; i < offset.length; i++) if (typeof offset[i] == "string") if (offset[i].includes("%")) relativeOffset[i] = parseInt(offset[i].replace("%", "") * _this6.windowWidth / 100); else relativeOffset[i] = parseInt(offset[i]); else relativeOffset[i] = offset[i];
                        left += relativeOffset[0];
                        right -= relativeOffset[1];
                    } else {
                        for (i = 0; i < offset.length; i++) if (typeof offset[i] == "string") if (offset[i].includes("%")) relativeOffset[i] = parseInt(offset[i].replace("%", "") * _this6.windowHeight / 100); else relativeOffset[i] = parseInt(offset[i]); else relativeOffset[i] = offset[i];
                        top += relativeOffset[0];
                        bottom -= relativeOffset[1];
                    }
                    var mappedEl = {
                        el,
                        id,
                        class: cl,
                        section,
                        top,
                        middle,
                        bottom,
                        left,
                        right,
                        offset,
                        progress: 0,
                        repeat,
                        inView: false,
                        call,
                        speed,
                        delay,
                        position,
                        target: targetEl,
                        direction,
                        sticky
                    };
                    _this6.els[id] = mappedEl;
                    if (el.classList.contains(cl)) _this6.setInView(_this6.els[id], id);
                    if (speed !== false || sticky) _this6.parallaxElements[id] = mappedEl;
                }));
            }
        }, {
            key: "addSections",
            value: function addSections() {
                var _this7 = this;
                this.sections = {};
                var sections = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
                if (sections.length === 0) sections = [ this.el ];
                sections.forEach((function(section, index) {
                    var id = typeof section.dataset[_this7.name + "Id"] === "string" ? section.dataset[_this7.name + "Id"] : "section" + index;
                    var sectionBCR = section.getBoundingClientRect();
                    var offset = {
                        x: sectionBCR.left - window.innerWidth * 1.5 - locomotive_scroll_esm_getTranslate(section).x,
                        y: sectionBCR.top - window.innerHeight * 1.5 - locomotive_scroll_esm_getTranslate(section).y
                    };
                    var limit = {
                        x: offset.x + sectionBCR.width + window.innerWidth * 2,
                        y: offset.y + sectionBCR.height + window.innerHeight * 2
                    };
                    var persistent = typeof section.dataset[_this7.name + "Persistent"] === "string";
                    section.setAttribute("data-scroll-section-id", id);
                    var mappedSection = {
                        el: section,
                        offset,
                        limit,
                        inView: false,
                        persistent,
                        id
                    };
                    _this7.sections[id] = mappedSection;
                }));
            }
        }, {
            key: "transform",
            value: function transform(element, x, y, delay) {
                var transform;
                if (!delay) transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(x, ",").concat(y, ",0,1)"); else {
                    var start = locomotive_scroll_esm_getTranslate(element);
                    var lerpX = lerp(start.x, x, delay);
                    var lerpY = lerp(start.y, y, delay);
                    transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(lerpX, ",").concat(lerpY, ",0,1)");
                }
                element.style.webkitTransform = transform;
                element.style.msTransform = transform;
                element.style.transform = transform;
            }
        }, {
            key: "transformElements",
            value: function transformElements(isForced) {
                var _this8 = this;
                var setAllElements = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                var scrollRight = this.instance.scroll.x + this.windowWidth;
                var scrollBottom = this.instance.scroll.y + this.windowHeight;
                var scrollMiddle = {
                    x: this.instance.scroll.x + this.windowMiddle.x,
                    y: this.instance.scroll.y + this.windowMiddle.y
                };
                Object.entries(this.parallaxElements).forEach((function(_ref5) {
                    var _ref6 = _slicedToArray(_ref5, 2), current = (_ref6[0], _ref6[1]);
                    var transformDistance = false;
                    if (isForced) transformDistance = 0;
                    if (current.inView || setAllElements) switch (current.position) {
                      case "top":
                        transformDistance = _this8.instance.scroll[_this8.directionAxis] * -current.speed;
                        break;

                      case "elementTop":
                        transformDistance = (scrollBottom - current.top) * -current.speed;
                        break;

                      case "bottom":
                        transformDistance = (_this8.instance.limit[_this8.directionAxis] - scrollBottom + _this8.windowHeight) * current.speed;
                        break;

                      case "left":
                        transformDistance = _this8.instance.scroll[_this8.directionAxis] * -current.speed;
                        break;

                      case "elementLeft":
                        transformDistance = (scrollRight - current.left) * -current.speed;
                        break;

                      case "right":
                        transformDistance = (_this8.instance.limit[_this8.directionAxis] - scrollRight + _this8.windowHeight) * current.speed;
                        break;

                      default:
                        transformDistance = (scrollMiddle[_this8.directionAxis] - current.middle[_this8.directionAxis]) * -current.speed;
                        break;
                    }
                    if (current.sticky) if (current.inView) if (_this8.direction === "horizontal") transformDistance = _this8.instance.scroll.x - current.left + window.innerWidth; else transformDistance = _this8.instance.scroll.y - current.top + window.innerHeight; else if (_this8.direction === "horizontal") if (_this8.instance.scroll.x < current.left - window.innerWidth && _this8.instance.scroll.x < current.left - window.innerWidth / 2) transformDistance = 0; else if (_this8.instance.scroll.x > current.right && _this8.instance.scroll.x > current.right + 100) transformDistance = current.right - current.left + window.innerWidth; else transformDistance = false; else if (_this8.instance.scroll.y < current.top - window.innerHeight && _this8.instance.scroll.y < current.top - window.innerHeight / 2) transformDistance = 0; else if (_this8.instance.scroll.y > current.bottom && _this8.instance.scroll.y > current.bottom + 100) transformDistance = current.bottom - current.top + window.innerHeight; else transformDistance = false;
                    if (transformDistance !== false) if (current.direction === "horizontal" || _this8.direction === "horizontal" && current.direction !== "vertical") _this8.transform(current.el, transformDistance, 0, isForced ? false : current.delay); else _this8.transform(current.el, 0, transformDistance, isForced ? false : current.delay);
                }));
            }
        }, {
            key: "scrollTo",
            value: function scrollTo(target) {
                var _this9 = this;
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var offset = parseInt(options.offset) || 0;
                var duration = !isNaN(parseInt(options.duration)) ? parseInt(options.duration) : 1e3;
                var easing = options.easing || [ .25, 0, .35, 1 ];
                var disableLerp = options.disableLerp ? true : false;
                var callback = options.callback ? options.callback : false;
                easing = src$1.apply(void 0, _toConsumableArray(easing));
                if (typeof target === "string") if (target === "top") target = 0; else if (target === "bottom") target = this.instance.limit.y; else if (target === "left") target = 0; else if (target === "right") target = this.instance.limit.x; else {
                    target = document.querySelector(target);
                    if (!target) return;
                } else if (typeof target === "number") target = parseInt(target); else if (target && target.tagName) ; else {
                    console.warn("`target` parameter is not valid");
                    return;
                }
                if (typeof target !== "number") {
                    var targetInScope = getParents(target).includes(this.el);
                    if (!targetInScope) return;
                    var targetBCR = target.getBoundingClientRect();
                    var offsetTop = targetBCR.top;
                    var offsetLeft = targetBCR.left;
                    var targetParents = getParents(target);
                    var parentSection = targetParents.find((function(candidate) {
                        return Object.entries(_this9.sections).map((function(_ref7) {
                            var _ref8 = _slicedToArray(_ref7, 2), section = (_ref8[0], _ref8[1]);
                            return section;
                        })).find((function(section) {
                            return section.el == candidate;
                        }));
                    }));
                    var parentSectionOffset = 0;
                    if (parentSection) parentSectionOffset = locomotive_scroll_esm_getTranslate(parentSection)[this.directionAxis]; else parentSectionOffset = -this.instance.scroll[this.directionAxis];
                    if (this.direction === "horizontal") offset = offsetLeft + offset - parentSectionOffset; else offset = offsetTop + offset - parentSectionOffset;
                } else offset = target + offset;
                var scrollStart = parseFloat(this.instance.delta[this.directionAxis]);
                var scrollTarget = Math.max(0, Math.min(offset, this.instance.limit[this.directionAxis]));
                var scrollDiff = scrollTarget - scrollStart;
                var render = function render(p) {
                    if (disableLerp) if (_this9.direction === "horizontal") _this9.setScroll(scrollStart + scrollDiff * p, _this9.instance.delta.y); else _this9.setScroll(_this9.instance.delta.x, scrollStart + scrollDiff * p); else _this9.instance.delta[_this9.directionAxis] = scrollStart + scrollDiff * p;
                };
                this.animatingScroll = true;
                this.stopScrolling();
                this.startScrolling();
                var start = Date.now();
                var loop = function loop() {
                    var p = (Date.now() - start) / duration;
                    if (p > 1) {
                        render(1);
                        _this9.animatingScroll = false;
                        if (duration == 0) _this9.update();
                        if (callback) callback();
                    } else {
                        _this9.scrollToRaf = requestAnimationFrame(loop);
                        render(easing(p));
                    }
                };
                loop();
            }
        }, {
            key: "update",
            value: function update() {
                this.setScrollLimit();
                this.addSections();
                this.addElements();
                this.detectElements();
                this.updateScroll();
                this.transformElements(true);
                this.reinitScrollBar();
                this.checkScroll(true);
            }
        }, {
            key: "startScroll",
            value: function startScroll() {
                this.stop = false;
            }
        }, {
            key: "stopScroll",
            value: function stopScroll() {
                this.stop = true;
            }
        }, {
            key: "setScroll",
            value: function setScroll(x, y) {
                this.instance = _objectSpread2(_objectSpread2({}, this.instance), {}, {
                    scroll: {
                        x,
                        y
                    },
                    delta: {
                        x,
                        y
                    },
                    speed: 0
                });
            }
        }, {
            key: "destroy",
            value: function destroy() {
                _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);
                this.stopScrolling();
                this.html.classList.remove(this.smoothClass);
                this.vs.destroy();
                this.destroyScrollBar();
                window.removeEventListener("keydown", this.checkKey, false);
            }
        } ]);
        return _default;
    }(_default);
    var Smooth = function() {
        function Smooth() {
            var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            _classCallCheck(this, Smooth);
            this.options = options;
            Object.assign(this, locomotive_scroll_esm_defaults, options);
            this.smartphone = locomotive_scroll_esm_defaults.smartphone;
            if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
            this.tablet = locomotive_scroll_esm_defaults.tablet;
            if (options.tablet) Object.assign(this.tablet, options.tablet);
            if (!this.smooth && this.direction == "horizontal") console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible");
            if (!this.tablet.smooth && this.tablet.direction == "horizontal") console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible (tablet)");
            if (!this.smartphone.smooth && this.smartphone.direction == "horizontal") console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible (smartphone)");
            this.init();
        }
        _createClass(Smooth, [ {
            key: "init",
            value: function init() {
                this.options.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1 || window.innerWidth < this.tablet.breakpoint;
                this.options.isTablet = this.options.isMobile && window.innerWidth >= this.tablet.breakpoint;
                if (this.smooth && !this.options.isMobile || this.tablet.smooth && this.options.isTablet || this.smartphone.smooth && this.options.isMobile && !this.options.isTablet) this.scroll = new _default$2(this.options); else this.scroll = new _default$1(this.options);
                this.scroll.init();
                if (window.location.hash) {
                    var id = window.location.hash.slice(1, window.location.hash.length);
                    var target = document.getElementById(id);
                    if (target) this.scroll.scrollTo(target);
                }
            }
        }, {
            key: "update",
            value: function update() {
                this.scroll.update();
            }
        }, {
            key: "start",
            value: function start() {
                this.scroll.startScroll();
            }
        }, {
            key: "stop",
            value: function stop() {
                this.scroll.stopScroll();
            }
        }, {
            key: "scrollTo",
            value: function scrollTo(target, options) {
                this.scroll.scrollTo(target, options);
            }
        }, {
            key: "setScroll",
            value: function setScroll(x, y) {
                this.scroll.setScroll(x, y);
            }
        }, {
            key: "on",
            value: function on(event, func) {
                this.scroll.setEvents(event, func);
            }
        }, {
            key: "off",
            value: function off(event, func) {
                this.scroll.unsetEvents(event, func);
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.scroll.destroy();
            }
        } ]);
        return Smooth;
    }();
    null && function() {
        function Native() {
            var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            _classCallCheck(this, Native);
            this.options = options;
            Object.assign(this, locomotive_scroll_esm_defaults, options);
            this.smartphone = locomotive_scroll_esm_defaults.smartphone;
            if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
            this.tablet = locomotive_scroll_esm_defaults.tablet;
            if (options.tablet) Object.assign(this.tablet, options.tablet);
            this.init();
        }
        _createClass(Native, [ {
            key: "init",
            value: function init() {
                this.scroll = new _default$1(this.options);
                this.scroll.init();
                if (window.location.hash) {
                    var id = window.location.hash.slice(1, window.location.hash.length);
                    var target = document.getElementById(id);
                    if (target) this.scroll.scrollTo(target);
                }
            }
        }, {
            key: "update",
            value: function update() {
                this.scroll.update();
            }
        }, {
            key: "start",
            value: function start() {
                this.scroll.startScroll();
            }
        }, {
            key: "stop",
            value: function stop() {
                this.scroll.stopScroll();
            }
        }, {
            key: "scrollTo",
            value: function scrollTo(target, options) {
                this.scroll.scrollTo(target, options);
            }
        }, {
            key: "setScroll",
            value: function setScroll(x, y) {
                this.scroll.setScroll(x, y);
            }
        }, {
            key: "on",
            value: function on(event, func) {
                this.scroll.setEvents(event, func);
            }
        }, {
            key: "off",
            value: function off(event, func) {
                this.scroll.unsetEvents(event, func);
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.scroll.destroy();
            }
        } ]);
    }();
    const locomotive_scroll_esm = Smooth;
    let script_scroll;
    const preloader = document.querySelector(".preloader");
    window.addEventListener("load", (function(e) {
        setTimeout((() => {
            script_scroll = new locomotive_scroll_esm({
                el: document.querySelector("[data-scroll-container]"),
                smooth: 1,
                lerp: .1
            });
            preloader.classList.add("loaded");
            document.querySelectorAll("[data-scroll-to]").forEach((link => {
                link.addEventListener("click", scrollToSection);
            }));
            function scrollToSection(e) {
                e.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const targetOffset = targetElement.offsetTop;
                    script_scroll.scrollTo(targetOffset);
                }
            }
        }), 400);
        atantionInit();
    }));
    function atantionInit() {
        const atentionItem = document.querySelector(".atantion");
        if (atentionItem) {
            const savedChoice = localStorage.getItem("userChoice");
            if (!savedChoice) setTimeout((() => {
                atentionItem.classList.add("_active");
            }), 2e3);
            const atentionItemBtn = atentionItem.querySelector("button");
            atentionItemBtn.addEventListener("click", (function(e) {
                if (atentionItem.classList.contains("_active")) {
                    atentionItem.classList.remove("_active");
                    localStorage.setItem("userChoice", "true");
                }
            }));
        }
    }
    window["FLS"] = true;
    isWebp();
})();