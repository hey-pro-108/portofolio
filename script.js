(function() {
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const clockElement = document.getElementById('clock');
    if (clockElement) {
      clockElement.textContent = hours + ':' + minutes;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);
  
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', function() {
      const windows = document.querySelectorAll('.window');
      windows.forEach(function(win, index) {
        setTimeout(function() {
          win.style.boxShadow = 'inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff, 4px 4px 8px rgba(0,0,0,0.3)';
          win.style.opacity = '1';
        }, index * 50);
      });
    });
  }
  
  const exploreBtn = document.getElementById('exploreBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function() {
      const certWin = document.getElementById('winCerts');
      if (certWin) {
        certWin.scrollIntoView({ behavior: 'smooth', block: 'start' });
        certWin.style.boxShadow = '0 0 0 2px #ffffff, 0 0 0 4px #000080';
        setTimeout(function() {
          certWin.style.boxShadow = 'inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff, 4px 4px 8px rgba(0,0,0,0.3)';
        }, 1000);
      }
    });
  }
  
  const allBtns = document.querySelectorAll('.win-btn');
  allBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const windowEl = this.closest('.window');
      if (windowEl) {
        if (this.textContent === 'X') {
          windowEl.style.display = 'none';
          setTimeout(function() {
            windowEl.style.display = 'flex';
          }, 2000);
        } else if (this.textContent === '_') {
          windowEl.style.opacity = '0.5';
          setTimeout(function() {
            windowEl.style.opacity = '1';
          }, 800);
        } else if (this.textContent === '□') {
          windowEl.classList.toggle('maximized');
          if (windowEl.classList.contains('maximized')) {
            windowEl.style.position = 'fixed';
            windowEl.style.top = '40px';
            windowEl.style.left = '0';
            windowEl.style.right = '0';
            windowEl.style.bottom = '0';
            windowEl.style.width = 'auto';
            windowEl.style.height = 'auto';
            windowEl.style.zIndex = '999';
            windowEl.style.margin = '0';
          } else {
            windowEl.style.position = 'relative';
            windowEl.style.top = 'auto';
            windowEl.style.left = 'auto';
            windowEl.style.right = 'auto';
            windowEl.style.bottom = 'auto';
            windowEl.style.width = 'auto';
            windowEl.style.height = 'auto';
            windowEl.style.zIndex = 'auto';
          }
        }
      }
    });
  });
  
  const windows = document.querySelectorAll('.window');
  windows.forEach(function(win) {
    const bar = win.querySelector('.window-bar');
    let isDragging = false;
    let offsetX, offsetY;
    
    bar.addEventListener('mousedown', function(e) {
      if (win.classList.contains('maximized')) return;
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      win.style.position = 'absolute';
      win.style.zIndex = '1000';
    });
    
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;
      newX = Math.max(0, Math.min(newX, window.innerWidth - win.offsetWidth));
      newY = Math.max(40, Math.min(newY, window.innerHeight - 100));
      win.style.left = newX + 'px';
      win.style.top = newY + 'px';
    });
    
    document.addEventListener('mouseup', function() {
      isDragging = false;
    });
  });
  
  const progressFills = document.querySelectorAll('.progress-fill');
  progressFills.forEach(function(fill) {
    const targetWidth = fill.style.width;
    fill.style.width = '0%';
    setTimeout(function() {
      fill.style.width = targetWidth;
    }, 200);
  });
})();
