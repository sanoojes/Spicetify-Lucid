import React from 'react';
import PlaylistViewManager from '@/components/playlistViews/PlaylistViewManager';

export const useUnderMainViewLoader = () => {
  const underMainViewRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const setUnderMainView = () => {
      if (document.getElementById('lucid-under-main-view')) {
        return;
      }

      const newUnderMainView = document.createElement('div');
      newUnderMainView.id = 'lucid-under-main-view';
      newUnderMainView.className = 'lucid-under-main-view';

      const mainViewContainer = document.querySelector('.main-view-container');
      if (mainViewContainer) {
        mainViewContainer.prepend(newUnderMainView);
      }

      underMainViewRef.current = newUnderMainView;

      if (underMainViewRef.current) {
        Spicetify.ReactDOM.createRoot(underMainViewRef.current).render(
          <PlaylistViewManager />
        );
      }
    };

    setUnderMainView();
    const unlistenHistory = Spicetify.Platform.History.listen(() => {
      setUnderMainView();
    });

    return () => {
      unlistenHistory();
    };
  }, []);
};
