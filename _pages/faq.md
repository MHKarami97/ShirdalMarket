---
title: "سوالات متداول"
description: "پاسخ به پرتکرارترین سوالات مشتریان"
permalink: /faq/
schema_type: faq
---

<div class="faq-container">
{% for item in site.data.faq %}
<div class="accordion-item">
  <button class="accordion-header" aria-expanded="false">
    <span>{{ item.question }}</span>
    <svg data-accordion-icon class="accordion-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
  </button>
  <div class="accordion-body accordion-body--animated">
    <p>{{ item.answer }}</p>
  </div>
</div>
{% endfor %}
</div>
