declare global {
    interface Window {
        $wujie: Record<string, any>;
        __POWERED_BY_WUJIE__?: boolean;
        __WUJIE: Record<string, any>;
    }
}
export default function (): void;
