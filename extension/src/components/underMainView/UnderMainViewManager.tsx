import React from 'react';
import { useLucidStore } from '@/store/useLucidStore';

const UnderMainViewManager: React.FC = () => {
  const {
    underMainBackgroundImage,
    setUnderMainViewBackgroundImage,
    rootStyle,
  } = useLucidStore();

  React.useEffect(() => {
    const handleMutations = (mutationsList: MutationRecord[]) => {
      const backgroundImageNode = mutationsList.reduce<HTMLElement | null>(
        (foundNode, mutation) => {
          if (foundNode) return foundNode;
          if (
            mutation.type === 'childList' &&
            mutation.addedNodes.length > 0 &&
            mutation.addedNodes[0].firstChild instanceof HTMLElement
          ) {
            return mutation.addedNodes[0].firstChild;
          }
          return null;
        },
        null
      );

      if (backgroundImageNode?.style) {
        setUnderMainViewBackgroundImage(
          backgroundImageNode.style.backgroundImage.replace(
            /url\(['"]?([^'"]*)['"]?\)/i,
            '$1'
          )
        );
      } else {
        if (underMainBackgroundImage !== null) {
          setUnderMainViewBackgroundImage(null);
        }
      }
    };

    const observer = new MutationObserver(handleMutations);
    const underMainView = document.querySelector('.under-main-view');
    if (underMainView) {
      observer.observe(underMainView, { childList: true });
    }

    return () => observer.disconnect();
  }, [setUnderMainViewBackgroundImage]);

  React.useEffect(() => {
    if (underMainBackgroundImage)
      rootStyle.setProperty(
        '--under-main-view-art-image',
        `url(${underMainBackgroundImage})`
      );
    else rootStyle.removeProperty('--under-main-view-art-image');
  }, [underMainBackgroundImage, rootStyle]);

  return <></>;
};

export default UnderMainViewManager;
