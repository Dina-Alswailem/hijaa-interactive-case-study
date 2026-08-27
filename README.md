# هِجاء — Interactive Arabic Learning Case Study

![هِجاء — الحرف يُرى، ويُسمع، ويُلمس](public/og.png)

**هِجاء** is a multisensory Arabic learning experience designed for children with learning difficulties. The iPad app helps learners recognize Arabic letters through sight, sound, touch, coloring, and word-building activities.

[View the live interactive case study](https://hijaa-case-study.dina1-4075.chatgpt.site) · [Figma](https://www.figma.com/design/yuNUs7ty86nQGsp91CQvi8/%D9%87%D9%90%D8%AC%D8%A7%D8%A1?node-id=0-1) · [LinkedIn](https://www.linkedin.com/in/dina-alswailem-5a4786280)

## Why the name “هِجاء”?

The name comes from **التَّهجِئة**: reading and building a word one letter at a time. This idea shapes the product journey—hear a letter, recognize its form, interact with it, then use it to complete a word.

## The learning experience

- Choose between coloring and word-building activities.
- Explore Arabic letters individually or through a clear letter grid.
- Hear letters and familiar words with replay available at any time.
- Color and trace letters through touch-based interaction.
- Arrange letters to complete a word supported by an image and sound.
- Receive immediate, personalized encouragement from the selected character.

## Why four characters?

The app includes two girls and two boys with varied skin tones so more children can recognize themselves in the experience. The child’s selected character returns after a completed activity, making the success moment feel personal and reinforcing.

## Selected interaction flow

1. **Choose** a character.
2. **Listen** to a word and view its illustration.
3. **Arrange** the letters in the correct order.
4. **Celebrate** with the selected character, sound, and visual feedback.

The live case study recreates this loop as an interactive web prototype rather than presenting the project as static images.

## My contribution — Dina Alswailem

- Co-created the original Hijaa concept and iPad learning experience as part of a four-person team.
- Directed the case-study narrative, visual presentation, and interactive storytelling.
- Curated the original UI screens, app icon, characters, team assets, and learning rationale.
- Defined the website’s interaction and audio requirements.
- Reviewed and refined the Arabic copy, visual consistency, responsiveness, and final experience.
- Directed and shipped the case-study website using an **AI-assisted React implementation**.

## Collaboration and AI transparency

Hijaa is a **collaborative team project**. The original app concept, research, design, and development were produced by the Hijaa team.

The case-study website was created under Dina Alswailem’s product and creative direction. AI-assisted coding was used to accelerate the React implementation; Dina supplied the source material, requirements, design feedback, content decisions, and quality review. This repository does not claim that every line of the website was independently authored by Dina.

## Technology

- React 19 and TypeScript
- Next.js-compatible Vinext runtime
- CSS motion and responsive layouts
- Web Speech API and Web Audio API for interactive sound
- Arabic typography: NT Panorama Naskh and Baloo Bhaijaan 2
- Deployed with ChatGPT Sites

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal.

## Project structure

```text
app/
  page.tsx       Interactive case-study experience
  globals.css    Visual system, motion, and responsive behavior
  layout.tsx     Arabic metadata, fonts, and social sharing
public/
  assets/        Original Hijaa UI, characters, and team visuals
  fonts/         Arabic type assets
```

## Credits and rights

- Original iPad application: Hijaa team
- Interactive case-study direction: Dina Alswailem
- Website implementation: AI-assisted, directed and reviewed by Dina Alswailem

The illustrations, characters, screenshots, and product assets belong to their respective project creators. No reuse license is granted for those assets.

---

### بالعربي

هِجاء تجربة تعليمية عربية متعددة الحواس للأطفال ذوي صعوبات التعلّم. يوضّح الموقع التفاعلي كيف يجمع التطبيق بين الصورة والصوت واللمس والتلوين وترتيب الحروف، مع تعزيز شخصي يظهر فيه اختيار الطفل عند النجاح.

المشروع الأصلي نتاج عمل فريق هِجاء. أما دراسة الحالة التفاعلية فأُنجزت بتوجيه دينا السويلم للمحتوى والهوية وطريقة العرض والتفاعل، مع الاستعانة بالذكاء الاصطناعي في تنفيذ واجهة React ومراجعتها وتطويرها عبر عدة جولات.
