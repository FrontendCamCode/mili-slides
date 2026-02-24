/**
 * MiLi Slides — Per-slide feedback script
 * Adds a "Feedback" button to the controls bar that opens a pre-filled GitHub Issue.
 */
(function () {
  var REPO_OWNER = 'FrontendCamCode';
  var REPO_NAME = 'mili-slides';

  function getDeckName() {
    var title = document.title || '';
    return title.replace(/^MiLi\s*[—–\-]\s*/, '').trim() || 'Unknown Deck';
  }

  function getSlideInfo() {
    var activeFrame = document.querySelector('.frame.active');
    if (!activeFrame) return { number: 1, section: '' };

    var frameId = activeFrame.id || '';
    var number = parseInt(frameId.replace('f', ''), 10) || 1;

    var sectionEl = activeFrame.querySelector('.section-label');
    var section = sectionEl ? sectionEl.textContent.trim() : '';

    return { number: number, section: section };
  }

  function openFeedback() {
    var deck = getDeckName();
    var slide = getSlideInfo();
    var total = document.querySelectorAll('.frame').length;

    var title = '[' + deck + '] Slide ' + slide.number +
      (slide.section ? ' \u2014 ' + slide.section : '');

    var body =
      '## Slide Feedback\n\n' +
      '**Deck:** ' + deck + '\n' +
      '**Slide:** ' + slide.number + ' / ' + total + '\n' +
      '**Section:** ' + (slide.section || 'N/A') + '\n\n' +
      '---\n\n' +
      '### What\u2019s the feedback?\n\n' +
      '<!-- Describe what should change on this slide -->\n\n' +
      '### Suggestion (optional)\n\n' +
      '<!-- How would you improve it? -->\n';

    var url = 'https://github.com/' + REPO_OWNER + '/' + REPO_NAME +
      '/issues/new?title=' + encodeURIComponent(title) +
      '&body=' + encodeURIComponent(body) +
      '&labels=' + encodeURIComponent('slide-feedback');

    window.open(url, '_blank');
  }

  function addFeedbackButton() {
    var controls = document.querySelector('.controls');
    if (!controls) return;

    var btn = document.createElement('button');
    btn.id = 'feedbackBtn';
    btn.textContent = '\uD83D\uDCAC Feedback';
    btn.onclick = openFeedback;
    btn.style.marginLeft = '8px';
    controls.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addFeedbackButton);
  } else {
    addFeedbackButton();
  }
})();
