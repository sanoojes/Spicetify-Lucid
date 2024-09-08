import React from 'react';
import { useLucidStore } from '@/store/useLucidStore';

const UnderMainViewManager = () => {
  const {
    underMainBackgroundImage,
    setUnderMainViewBackgroundImage,
    rootStyle,
  } = useLucidStore();

  const handleMutations = React.useCallback(
    (mutationsList: MutationRecord[]) => {
      const backgroundImageNode = mutationsList.reduce<HTMLDivElement | null>(
        (foundNode, mutation) => {
          if (foundNode) return foundNode;
          if (
            mutation.type === 'childList' &&
            mutation.addedNodes.length > 0 &&
            mutation.addedNodes[0].firstChild instanceof HTMLDivElement
          ) {
            return mutation.addedNodes[0].firstChild as HTMLDivElement;
          }
          return null;
        },
        null
      );

      if (backgroundImageNode?.style) {
        const imageUrl = backgroundImageNode.style.backgroundImage.replace(
          /url\(['"]?([^'"]*)['"]?\)/i,
          '$1'
        );
        setUnderMainViewBackgroundImage(imageUrl);
      } else if (underMainBackgroundImage !== null) {
        setUnderMainViewBackgroundImage(null);
      }
    },
    [setUnderMainViewBackgroundImage, underMainBackgroundImage]
  );

  React.useEffect(() => {
    const observer = new MutationObserver(handleMutations);
    const underMainView = document.querySelector(
      '.under-main-view'
    ) as HTMLDivElement | null;

    if (underMainView) {
      observer.observe(underMainView, { childList: true });
    }

    return () => observer.disconnect();
  }, [handleMutations]);

  React.useEffect(() => {
    if (underMainBackgroundImage) {
      rootStyle.setProperty(
        '--under-main-view-art-image',
        `url(${underMainBackgroundImage})`
      );
    } else {
      rootStyle.removeProperty('--under-main-view-art-image');
    }
  }, [underMainBackgroundImage, rootStyle]);

  return null;
};

export default UnderMainViewManager;
