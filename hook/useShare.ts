export interface ShareData {
  url: string;
  text: string;
}
export const useShare = (opts: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const share = async (shareData: ShareData) => {
    if (typeof window === "undefined") {
      return null;
    }
    if (navigator?.canShare?.(shareData) && navigator.share) {
      try {
        await navigator.share(shareData);
        return opts.onSuccess();
      } catch (error: any) {
        return opts.onError();
	}
}
	return opts.onError();
  };

  return {
    share,
  };
};
