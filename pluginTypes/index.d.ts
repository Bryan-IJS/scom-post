/// <amd-module name="@scom/scom-post/global/interface.ts" />
declare module "@scom/scom-post/global/interface.ts" {
    export interface IAuthor {
        id: string;
        username: string;
        description: string;
        avatar: string;
        pubKey?: string;
        displayName?: string;
        internetIdentifier: string;
    }
    export interface IPost {
        id: string;
        author: IAuthor;
        parentAuthor?: IAuthor;
        publishDate: Date | string;
        stat?: IPostStat;
        contentElements: IPostData[];
    }
    export interface IPostStat {
        reply?: number;
        repost?: number;
        upvote?: number;
        downvote?: number;
        view?: number;
    }
    export interface IPostData {
        module: string;
        category?: "widget" | "quotedPost";
        data: any;
    }
}
/// <amd-module name="@scom/scom-post/store/index.ts" />
declare module "@scom/scom-post/store/index.ts" {
    export const state: {
        ipfsGatewayUrl: string;
    };
    export const setDataFromJson: (options: any) => void;
    export const setIPFSGatewayUrl: (url: string) => void;
    export const getIPFSGatewayUrl: () => string;
}
/// <amd-module name="@scom/scom-post/global/utils.ts" />
declare module "@scom/scom-post/global/utils.ts" {
    const getImageIpfsUrl: (url: string) => string;
    const formatNumber: (value: number | string, decimal?: number) => string;
    const getDuration: (date: Date | string) => string;
    export { getImageIpfsUrl, formatNumber, getDuration };
}
/// <amd-module name="@scom/scom-post/global/index.ts" />
declare module "@scom/scom-post/global/index.ts" {
    import { Control } from '@ijstech/components';
    import { IPostData } from "@scom/scom-post/global/interface.ts";
    export * from "@scom/scom-post/global/utils.ts";
    export * from "@scom/scom-post/global/interface.ts";
    export const MAX_HEIGHT = 352;
    export const getEmbedElement: (postData: IPostData, parent: Control, callback?: any) => Promise<any>;
}
/// <amd-module name="@scom/scom-post/index.css.ts" />
declare module "@scom/scom-post/index.css.ts" {
    export const getIconStyleClass: (color: string) => string;
    export const hoverStyle: string;
}
/// <amd-module name="@scom/scom-post/assets.ts" />
declare module "@scom/scom-post/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-post" />
declare module "@scom/scom-post" {
    import { ControlElement, Module, Container, Control, VStack } from '@ijstech/components';
    import { IPost, IPostData, IPostStat, IAuthor } from "@scom/scom-post/global/index.ts";
    export { IPost, IPostData, IPostStat, IAuthor };
    interface ScomPostElement extends ControlElement {
        data?: IPost;
        type?: PostType;
        isActive?: boolean;
        onReplyClicked?: callbackType;
        onProfileClicked?: callbackType;
        onQuotedPostClicked?: (target: ScomPost, event?: MouseEvent) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-post']: ScomPostElement;
            }
        }
    }
    interface IPostConfig {
        data?: IPost;
        type?: PostType;
        isActive?: boolean;
    }
    type PostType = 'full' | 'standard' | 'short' | 'quoted';
    type callbackType = (target: Control, data: IPost, event?: Event) => void;
    export class ScomPost extends Module {
        private pnlInfo;
        private imgAvatar;
        private lblOwner;
        private lblUsername;
        private lblDate;
        private imgVerified;
        private pnlQuoted;
        private pnlWrapper;
        private pnlMore;
        private pnlReply;
        private pnlReplies;
        private gridPost;
        private btnViewMore;
        private pnlDetail;
        private pnlOverlay;
        private groupAnalysis;
        private pnlActiveBd;
        private pnlContent;
        private pnlReplyPath;
        private lbReplyTo;
        private pnlSubscribe;
        private _data;
        private _replies;
        onReplyClicked: callbackType;
        onProfileClicked: callbackType;
        onQuotedPostClicked: (target: ScomPost, event?: MouseEvent) => void;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomPostElement, parent?: Container): Promise<ScomPost>;
        get isActive(): boolean;
        set isActive(value: boolean);
        get type(): PostType;
        set type(value: PostType);
        get postData(): IPost;
        set postData(value: IPost);
        setData(data: IPostConfig): Promise<void>;
        getData(): IPostConfig;
        get replies(): IPost[];
        get isQuotedPost(): boolean;
        clear(): void;
        private renderUI;
        private addQuotedPost;
        private renderInfo;
        private renderPostType;
        private renderAnalytics;
        addReply(parentPostId: string, post: IPost): ScomPost;
        appendReplyPanel(): VStack;
        private renderReplies;
        private renderReply;
        appendShowMorePanel(): void;
        private onShowMore;
        private onProfileShown;
        private onViewMore;
        private onGoProfile;
        init(): Promise<void>;
        render(): any;
    }
}