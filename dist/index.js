var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-post/global/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    ;
    ;
    ;
});
define("@scom/scom-post/store/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getIPFSGatewayUrl = exports.setIPFSGatewayUrl = exports.setDataFromJson = exports.state = void 0;
    ///<amd-module name='@scom/scom-post/store/index.ts'/> 
    exports.state = {
        ipfsGatewayUrl: ""
    };
    const setDataFromJson = (options) => {
        if (options.ipfsGatewayUrl) {
            (0, exports.setIPFSGatewayUrl)(options.ipfsGatewayUrl);
        }
    };
    exports.setDataFromJson = setDataFromJson;
    const setIPFSGatewayUrl = (url) => {
        exports.state.ipfsGatewayUrl = url;
    };
    exports.setIPFSGatewayUrl = setIPFSGatewayUrl;
    const getIPFSGatewayUrl = () => {
        return exports.state.ipfsGatewayUrl;
    };
    exports.getIPFSGatewayUrl = getIPFSGatewayUrl;
});
define("@scom/scom-post/global/utils.ts", ["require", "exports", "@ijstech/components", "@scom/scom-post/store/index.ts"], function (require, exports, components_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDuration = exports.formatNumber = exports.getImageIpfsUrl = void 0;
    const getImageIpfsUrl = (url) => {
        const ipfsBaseUrl = (0, index_1.getIPFSGatewayUrl)();
        if (isIpfsCid(url))
            return ipfsBaseUrl + url;
        return url;
    };
    exports.getImageIpfsUrl = getImageIpfsUrl;
    const isIpfsCid = (value) => {
        const regex = new RegExp('^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})$');
        return regex.test(value);
    };
    const formatNumber = (value, decimal) => {
        const numberValue = Number(value);
        if (numberValue >= 10000) {
            return components_1.FormatUtils.formatNumber(value, { shortScale: true, decimalFigures: decimal ?? 0 });
        }
        return components_1.FormatUtils.formatNumber(value, { decimalFigures: decimal ?? 0 });
    };
    exports.formatNumber = formatNumber;
    const getDuration = (date) => {
        const startDate = (0, components_1.moment)(date);
        const endDate = (0, components_1.moment)(new Date());
        let duration = components_1.moment.duration(endDate.diff(startDate));
        let days = duration.asDays();
        if (days >= 1)
            return startDate.format('MMM DD');
        let hours = duration.asHours();
        if (hours >= 1)
            return `${formatNumber(hours, 0)}h`;
        let minutes = duration.asMinutes();
        if (minutes >= 1)
            return `${formatNumber(minutes, 0)}m`;
        let seconds = duration.asSeconds();
        return `${formatNumber(seconds, 0)}s`;
    };
    exports.getDuration = getDuration;
});
define("@scom/scom-post/global/index.ts", ["require", "exports", "@ijstech/components", "@scom/scom-post/global/utils.ts", "@scom/scom-post/global/interface.ts"], function (require, exports, components_2, utils_1, interface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEmbedElement = exports.MAX_HEIGHT = void 0;
    __exportStar(utils_1, exports);
    __exportStar(interface_1, exports);
    exports.MAX_HEIGHT = 352;
    const getEmbedElement = async (postData, parent, callback) => {
        const { module, data } = postData;
        const elm = await components_2.application.createElement(module, true);
        if (!elm)
            throw new Error('not found');
        elm.parent = parent;
        const builderTarget = elm.getConfigurators ? elm.getConfigurators().find((conf) => conf.target === 'Builders') : null;
        if (elm.ready)
            await elm.ready();
        elm.maxWidth = '100%';
        elm.maxHeight = '100%';
        if (builderTarget?.setData && data.properties) {
            await builderTarget.setData(data.properties);
        }
        if (builderTarget?.setTag && data.tag) {
            await builderTarget.setTag(data.tag);
        }
        if (callback)
            callback(elm);
        return elm;
    };
    exports.getEmbedElement = getEmbedElement;
});
define("@scom/scom-post/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hoverStyle = exports.getIconStyleClass = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
    const getIconStyleClass = (color) => {
        const styleObj = {
            $nest: {
                'i-label': {
                    transition: 'color 0.3s ease-in'
                },
                '&:hover': {
                    $nest: {
                        'i-icon svg': {
                            fill: `${color}!important`
                        },
                        'i-label': {
                            color: `${color}!important`
                        }
                    }
                }
            }
        };
        return components_3.Styles.style(styleObj);
    };
    exports.getIconStyleClass = getIconStyleClass;
    exports.hoverStyle = components_3.Styles.style({
        $nest: {
            '&:hover svg': {
                fill: `${Theme.text.primary} !important`
            }
        }
    });
});
define("@scom/scom-post/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const moduleDir = components_4.application.currentModuleDir;
    function fullPath(path) {
        return `${moduleDir}/${path}`;
    }
    ;
    exports.default = {
        fullPath
    };
});
define("@scom/scom-post", ["require", "exports", "@ijstech/components", "@scom/scom-post/global/index.ts", "@scom/scom-post/index.css.ts", "@scom/scom-post/assets.ts"], function (require, exports, components_5, global_1, index_css_1, assets_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomPost = void 0;
    const Theme = components_5.Styles.Theme.ThemeVars;
    let ScomPost = class ScomPost extends components_5.Module {
        constructor(parent, options) {
            super(parent, options);
            this.onShowMore = this.onShowMore.bind(this);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get isActive() {
            return this._data.isActive ?? false;
        }
        set isActive(value) {
            this._data.isActive = value ?? false;
        }
        get type() {
            return this._data.type ?? 'standard';
        }
        set type(value) {
            this._data.type = value ?? 'standard';
        }
        get postData() {
            return this._data.data;
        }
        set postData(value) {
            this._data.data = value;
        }
        async setData(data) {
            this._data = { ...data };
            await this.renderUI();
        }
        getData() {
            return this._data;
        }
        get replies() {
            return this._replies ?? [];
        }
        get isQuotedPost() {
            return this.type === 'quoted';
        }
        clear() {
            this.pnlOverlay.visible = false;
            this.btnViewMore.visible = false;
            this.pnlContent.clearInnerHTML();
            this.pnlContent.minHeight = '5rem';
            if (this.pnlMore) {
                this.pnlMore.remove();
                this.pnlMore = undefined;
            }
            this._replies = [];
            this.pnlActiveBd.visible = false;
            this.pnlReplyPath.visible = false;
            this.pnlInfo.clearInnerHTML();
        }
        async renderUI() {
            this.clear();
            const { stat, parentAuthor, contentElements } = this._data?.data || {};
            this.renderPostType();
            if (parentAuthor) {
                this.pnlReplyPath.visible = true;
                this.lbReplyTo.caption = parentAuthor.displayName || '';
            }
            this.pnlActiveBd.visible = this.isActive;
            this.gridPost.border.radius = this.isActive ? '0.25rem' : '0.5rem';
            this.gridPost.cursor = this.isActive ? 'default' : 'pointer';
            if (!this.isQuotedPost)
                this.renderAnalytics(stat);
            this.groupAnalysis.visible = !this.isQuotedPost;
            this.pnlSubscribe.visible = !this.isQuotedPost;
            // let _height = 0;
            if (contentElements?.length) {
                for (let item of contentElements) {
                    if (item.category === 'quotedPost') {
                        this.addQuotedPost(item?.data?.properties);
                    }
                    else {
                        (0, global_1.getEmbedElement)(item, this.pnlContent, (elm) => {
                            // _height += Number(elm.height || 0);
                            // if (_height > MAX_HEIGHT && !this.btnViewMore.visible) {
                            //   this.pnlOverlay.visible = true;
                            //   this.btnViewMore.visible = true;
                            // }
                            this.pnlContent.minHeight = 'auto';
                        });
                    }
                }
            }
        }
        addQuotedPost(post) {
            const postEl = (this.$render("i-scom-post", { type: "quoted", data: post, display: "block", border: { radius: '0.5rem', width: '1px', style: 'solid', color: Theme.colors.secondary.dark } }));
            postEl.onClick = this.onQuotedPostClicked;
            postEl.onQuotedPostClicked = this.onQuotedPostClicked;
            this.pnlQuoted.append(postEl);
            this.pnlQuoted.visible = true;
        }
        renderInfo(oneLine) {
            const { publishDate, author } = this.postData;
            this.imgAvatar.url = author?.avatar ?? '';
            this.imgAvatar.objectFit = 'cover';
            const imgWidth = this.isQuotedPost ? '1.75rem' : '2.75rem';
            this.imgAvatar.width = this.imgAvatar.height = imgWidth;
            const userEl = (this.$render("i-hstack", { verticalAlignment: 'center', gap: "0.25rem" },
                this.$render("i-label", { id: "lblOwner", caption: author?.displayName || '', textOverflow: "ellipsis", maxWidth: this.isQuotedPost ? '9.375rem' : '6.25rem', font: { size: this.isQuotedPost ? '1rem' : '0.875rem', weight: 500 }, lineHeight: '0.875rem' }),
                this.$render("i-icon", { id: "imgVerified", width: '0.875rem', height: '0.875rem', name: "certificate", fill: Theme.text.secondary, display: "inline-flex" })));
            const dateEl = (this.$render("i-hstack", { gap: '0.25rem', stack: { shrink: '0' } },
                this.$render("i-panel", { border: { left: { width: '1px', style: 'solid', color: Theme.text.secondary } } }),
                this.$render("i-label", { id: "lblDate", font: { size: '0.875rem', color: Theme.text.secondary }, caption: `${(0, global_1.getDuration)(publishDate)}`, lineHeight: '0.875rem' })));
            const usernameEl = (this.$render("i-label", { id: "lblUsername", caption: `${author?.internetIdentifier || ''}`, maxWidth: this.isQuotedPost ? '13.75rem' : '100%', textOverflow: "ellipsis", font: { size: this.isQuotedPost ? '1rem' : '0.875rem', color: Theme.text.secondary }, lineHeight: '0.875rem' }));
            if (oneLine) {
                this.pnlInfo.append(this.$render("i-hstack", { height: "100%", gap: "0.25rem", verticalAlignment: "center" },
                    userEl,
                    usernameEl,
                    dateEl));
            }
            else {
                this.pnlInfo.append(this.$render("i-vstack", { gap: "0.5rem" },
                    this.$render("i-hstack", { gap: "0.25rem", verticalAlignment: "center" },
                        userEl,
                        dateEl),
                    usernameEl));
            }
        }
        renderPostType() {
            this.gridPost.templateColumns = ['2.75rem', 'minmax(auto, calc(100% - 3.5rem))'];
            this.gridPost.templateRows = ['auto'];
            this.gridPost.background.color = Theme.background.paper;
            if (this.isQuotedPost) {
                this.renderInfo(true);
                this.gridPost.templateAreas = [
                    ['avatar', 'user'],
                    ['avatar', 'path'],
                    ['content', 'content']
                ];
                this.gridPost.templateColumns = ['1.75rem', 'minmax(auto, calc(100% - 4.5rem))'];
                this.gridPost.templateRows = ['1.75rem', 'auto'];
                this.gridPost.background.color = Theme.background.default;
            }
            else if (this.type === 'short') {
                this.renderInfo();
                this.gridPost.templateAreas = [
                    ['avatar', 'user'],
                    ['avatar', 'path'],
                    ['avatar', 'content']
                ];
            }
            else {
                this.renderInfo(true);
                this.gridPost.templateAreas = [
                    ['avatar', 'user'],
                    ['avatar', 'path'],
                    ['avatar', 'content']
                ];
            }
        }
        renderAnalytics(analytics) {
            const dataList = [
                {
                    value: analytics?.reply || 0,
                    name: 'Reply',
                    icon: { name: "comment-alt" },
                    hoveredColor: Theme.text.secondary,
                    onClick: (target, event) => {
                        if (this.onReplyClicked)
                            this.onReplyClicked(target, this.postData, event);
                    }
                },
                // {
                //   value: analytics?.bookmark || 0,
                //   name: 'Zap',
                //   icon: assets.fullPath('img/zap.svg'),
                //   hoveredIcon: assets.fullPath('img/zap_fill.svg'),
                //   hoveredColor: Theme.colors.warning.main
                // },
                {
                    value: analytics?.upvote || 0,
                    name: 'Like',
                    icon: { name: "heart" },
                    hoveredColor: Theme.colors.error.main
                },
                {
                    value: analytics?.repost || 0,
                    name: 'Repost',
                    icon: { name: "retweet" },
                    hoveredColor: Theme.colors.success.main
                }
            ];
            this.groupAnalysis.clearInnerHTML();
            for (let item of dataList) {
                const value = components_5.FormatUtils.formatNumber(item.value, { shortScale: true, decimalFigures: 0 });
                let itemEl = (this.$render("i-hstack", { verticalAlignment: "center", gap: '0.5rem', tooltip: { content: value, placement: 'bottomLeft' }, cursor: 'pointer', class: (0, index_css_1.getIconStyleClass)(item.hoveredColor) },
                    this.$render("i-icon", { width: '1rem', height: '1rem', fill: Theme.text.secondary, name: item.icon.name }),
                    this.$render("i-label", { caption: value, font: { color: Theme.colors.secondary.light, size: '1.125rem' } })));
                this.groupAnalysis.appendChild(itemEl);
                itemEl.onClick = (target, event) => {
                    if (item.onClick)
                        item.onClick(itemEl, event);
                };
            }
        }
        addReply(parentPostId, post) {
            if (parentPostId !== this.postData.id)
                return;
            if (!this.pnlReply)
                this.appendReplyPanel();
            this._replies.push(post);
            return this.renderReply(post, true);
        }
        ;
        appendReplyPanel() {
            this.pnlReply = this.$render("i-vstack", { id: "pnlReply", visible: !this.pnlMore },
                this.$render("i-vstack", { id: "pnlReplies", gap: '0.5rem' }));
            this.pnlWrapper.appendChild(this.pnlReply);
            return this.pnlReply;
        }
        ;
        renderReplies() {
            if (this.pnlReplies)
                this.pnlReplies.clearInnerHTML();
            const length = this._replies?.length;
            if (length) {
                for (let i = 0; i < length; i++) {
                    const reply = this._replies[i];
                    this.renderReply(reply);
                }
            }
        }
        renderReply(reply, isPrepend) {
            const childElm = this.$render("i-scom-post", null);
            childElm.onReplyClicked = this.onReplyClicked;
            childElm.onProfileClicked = this.onProfileClicked;
            childElm.onQuotedPostClicked = this.onQuotedPostClicked;
            childElm.parent = this.pnlReplies;
            if (isPrepend)
                this.pnlReplies.prepend(childElm);
            else
                this.pnlReplies.append(childElm);
            childElm.setData({ data: reply });
            return childElm;
        }
        appendShowMorePanel() {
            this.pnlMore = (this.$render("i-grid-layout", { id: "pnlMore", templateColumns: ['2.75rem', 'minmax(auto, calc(100% - 3.5rem))'], gap: { column: 12 }, padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }, onClick: this.onShowMore },
                this.$render("i-vstack", { height: '1rem', justifyContent: "space-between", alignItems: "center" },
                    this.$render("i-panel", { width: 2, height: 2, background: { color: Theme.colors.secondary.light } }),
                    this.$render("i-panel", { width: 2, height: 2, background: { color: Theme.colors.secondary.light } }),
                    this.$render("i-panel", { width: 2, height: 2, background: { color: Theme.colors.secondary.light } })),
                this.$render("i-label", { caption: 'Show replies', font: { color: Theme.colors.primary.main, size: '0.9rem' } })));
            if (this.pnlReply)
                this.pnlReply.visible = false;
            this.pnlWrapper.appendChild(this.pnlMore);
        }
        ;
        onShowMore() {
            this.pnlMore.visible = false;
            if (!this.pnlReply)
                this.appendReplyPanel();
            this.pnlReply.visible = true;
            this.renderReplies();
        }
        onProfileShown(target, event) {
            if (this.onProfileClicked)
                this.onProfileClicked(target, this.postData, event);
        }
        onViewMore() {
            this.pnlDetail.style.maxHeight = '';
            this.pnlDetail.style.overflow = '';
            this.pnlOverlay.visible = false;
            this.btnViewMore.visible = false;
        }
        onGoProfile() {
            if (this.postData?.author?.pubKey) {
                window.open(`#/p/${this.postData.author.pubKey}`, '_self');
            }
        }
        async init() {
            super.init();
            this.onReplyClicked = this.getAttribute('onReplyClicked', true) || this.onReplyClicked;
            this.onProfileClicked = this.getAttribute('onProfileClicked', true) || this.onProfileClicked;
            this.onQuotedPostClicked = this.getAttribute('onQuotedPostClicked', true) || this.onQuotedPostClicked;
            const data = this.getAttribute('data', true);
            const isActive = this.getAttribute('isActive', true, false);
            const type = this.getAttribute('type', true);
            if (data)
                await this.setData({ data, isActive, type });
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlWrapper", width: "100%", border: { radius: 'inherit' } },
                this.$render("i-grid-layout", { id: "gridPost", templateColumns: ['2.75rem', 'minmax(auto, calc(100% - 3.5rem))'], templateRows: ['auto'], gap: { column: '0.75rem' }, padding: { left: '1.25rem', right: '1.25rem', top: '1rem', bottom: '1rem' }, position: 'relative', border: { radius: '0.5rem' }, mediaQueries: [
                        {
                            maxWidth: '767px',
                            properties: {
                                padding: { left: '1rem', right: '1rem', top: '1rem', bottom: '1rem' }
                            }
                        }
                    ] },
                    this.$render("i-panel", { id: "pnlActiveBd", visible: false, width: '0.25rem', height: '100%', left: "0px", top: "0px", border: { radius: '0.25rem 0 0 0.25rem' }, background: { color: Theme.background.gradient } }),
                    this.$render("i-panel", { id: "pnlAvatar", grid: { area: 'avatar' } },
                        this.$render("i-image", { id: "imgAvatar", width: '2.75rem', height: '2.75rem', display: "block", background: { color: Theme.background.main }, border: { radius: '50%' }, overflow: 'hidden', objectFit: 'cover', fallbackUrl: assets_1.default.fullPath('img/default_avatar.png'), onClick: () => this.onGoProfile() })),
                    this.$render("i-hstack", { horizontalAlignment: "space-between", gap: "0.5rem", width: "100%", grid: { area: 'user' }, position: 'relative' },
                        this.$render("i-panel", { id: "pnlInfo", maxWidth: '100%', overflow: 'hidden' }),
                        this.$render("i-hstack", { id: "pnlSubscribe", stack: { shrink: '0' }, horizontalAlignment: "end", gap: "0.5rem" },
                            this.$render("i-button", { id: "btnSubscribe", minHeight: 32, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText }, border: { radius: '1.875rem' }, visible: false, caption: 'Subscribe' }),
                            this.$render("i-panel", { onClick: this.onProfileShown, cursor: "pointer", class: index_css_1.hoverStyle },
                                this.$render("i-icon", { name: "ellipsis-h", width: '1rem', height: '1rem', fill: Theme.text.secondary })))),
                    this.$render("i-hstack", { id: "pnlReplyPath", verticalAlignment: "center", gap: "0.25rem", visible: false, grid: { area: 'path' }, margin: { top: '0.5rem' } },
                        this.$render("i-label", { caption: 'replying to', font: { size: '0.875rem', color: Theme.colors.secondary.light } }),
                        this.$render("i-label", { id: "lbReplyTo", font: { size: '0.875rem', color: Theme.colors.primary.main }, cursor: "pointer", onClick: () => this.onGoProfile() })),
                    this.$render("i-vstack", { width: '100%', grid: { area: 'content' }, margin: { top: '1rem' } },
                        this.$render("i-panel", { id: "pnlDetail" },
                            this.$render("i-vstack", { id: "pnlContent", gap: "0.75rem" }),
                            this.$render("i-panel", { id: "pnlQuoted", visible: false }),
                            this.$render("i-panel", { id: "pnlOverlay", visible: false, height: '5rem', width: '100%', position: 'absolute', bottom: "0px", background: { color: `linear-gradient(0, var(--card-bg-color) 0%, transparent 100%)` } })),
                        this.$render("i-hstack", { id: "btnViewMore", verticalAlignment: "center", padding: { top: '1rem' }, gap: '0.25rem', visible: false, onClick: this.onViewMore },
                            this.$render("i-label", { caption: 'Read more', font: { size: '0.9rem', color: Theme.colors.primary.main } }),
                            this.$render("i-icon", { name: "angle-down", width: 16, height: 16, fill: Theme.colors.primary.main })),
                        this.$render("i-hstack", { id: "groupAnalysis", horizontalAlignment: "space-between", padding: { top: '1.063rem' }, width: '100%' })))));
        }
    };
    ScomPost = __decorate([
        (0, components_5.customElements)('i-scom-post')
    ], ScomPost);
    exports.ScomPost = ScomPost;
});