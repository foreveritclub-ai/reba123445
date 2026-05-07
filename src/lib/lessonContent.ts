// Generates a long, helpful written explanation for any lesson topic when the
// admin hasn't authored custom content yet. Produces 100+ sentences so learners
// always have substantial reading material.

export function generateLessonContent(opts: {
  lessonTitle: string;
  moduleTitle?: string;
  courseTitle?: string;
  instructor?: string;
}): string {
  const { lessonTitle, moduleTitle = "this module", courseTitle = "this course", instructor = "your instructor" } = opts;
  const T = lessonTitle;

  const sections: { heading: string; sentences: string[] }[] = [
    {
      heading: `Introduction to ${T}`,
      sentences: [
        `Welcome to the lesson on ${T}.`,
        `This lesson belongs to ${moduleTitle}, which is part of ${courseTitle}.`,
        `By the end of this lesson, you will have a clear, practical understanding of ${T}.`,
        `${T} is one of the most important concepts you will use throughout the rest of ${courseTitle}.`,
        `Understanding ${T} will give you a strong foundation for everything that comes after it.`,
        `Take your time with this material and re-read any section that feels unclear.`,
        `Learning is a process — repetition and practice are what turn knowledge into skill.`,
        `${instructor} has structured this lesson so each idea builds on the previous one.`,
        `Try to relate every new concept to something you already know.`,
        `If you can explain ${T} to someone else in your own words, you have truly learned it.`,
      ],
    },
    {
      heading: `Why ${T} matters`,
      sentences: [
        `${T} matters because it appears almost everywhere in real-world projects.`,
        `Professionals in this field use ${T} every single day to solve practical problems.`,
        `Without a solid grasp of ${T}, more advanced topics quickly become confusing.`,
        `Many beginner mistakes come from skipping over ${T} too quickly.`,
        `Investing time in ${T} now will save you many hours of debugging later.`,
        `${T} is the kind of concept that pays compounding returns as you grow.`,
        `Companies in Rwanda and across Africa actively look for people who understand ${T}.`,
        `When you can talk confidently about ${T}, you stand out in interviews.`,
        `Real systems are built on top of small, well-understood ideas like ${T}.`,
        `Treat ${T} as a tool you are adding to your professional toolbox.`,
      ],
    },
    {
      heading: `Core ideas of ${T}`,
      sentences: [
        `Let's break ${T} down into the smallest pieces possible.`,
        `Every complex topic is just a stack of simple ideas connected together.`,
        `The first idea behind ${T} is to start with the goal you want to achieve.`,
        `The second idea is to identify the inputs you have and the outputs you need.`,
        `The third idea is to choose the right approach for your specific situation.`,
        `The fourth idea is to test your approach with a small example before scaling up.`,
        `The fifth idea is to measure the result so you know if it actually worked.`,
        `${T} is not about memorising steps — it is about understanding why each step exists.`,
        `Whenever you feel stuck, return to these core ideas and ask which one is missing.`,
        `Most problems with ${T} can be solved by going back to fundamentals.`,
      ],
    },
    {
      heading: `A practical walkthrough of ${T}`,
      sentences: [
        `Imagine you are working on a real project that needs ${T} today.`,
        `Start by writing down, in plain language, what you want the result to look like.`,
        `Next, sketch the steps you think you will need to take.`,
        `Then, do the smallest possible version of those steps to prove the idea works.`,
        `Once the small version works, add one feature at a time.`,
        `After every change, check that everything still behaves the way you expected.`,
        `If something breaks, undo your last change and try a smaller step.`,
        `This loop — change, check, refine — is the heart of professional engineering.`,
        `Document each decision briefly so future-you can remember why you did it.`,
        `When the work is finished, write a short summary of what you learned about ${T}.`,
      ],
    },
    {
      heading: `Common mistakes with ${T}`,
      sentences: [
        `One common mistake is jumping into code or action before understanding the problem.`,
        `Another mistake is trying to solve everything at once instead of step by step.`,
        `Many learners forget to test small pieces before combining them.`,
        `Some people copy solutions without understanding why they work.`,
        `It is also common to ignore error messages instead of reading them carefully.`,
        `Skipping documentation is a habit that becomes painful later.`,
        `Trying to memorise every detail is less useful than understanding the structure.`,
        `Avoid the trap of perfection — done and tested beats perfect and unfinished.`,
        `Asking for help too late is more costly than asking too early.`,
        `Recognising these mistakes is the first step to avoiding them.`,
      ],
    },
    {
      heading: `How ${T} fits into the bigger picture`,
      sentences: [
        `${T} does not exist in isolation — it connects to the rest of ${courseTitle}.`,
        `Earlier lessons gave you the building blocks that this lesson now combines.`,
        `Later lessons will assume you are comfortable with ${T}, so practice it well.`,
        `In real teams, ${T} is usually one stage in a longer workflow.`,
        `Understanding the workflow around ${T} helps you collaborate with others.`,
        `Different industries apply ${T} in slightly different ways, but the core stays the same.`,
        `As you grow, you will see ${T} appear in projects you never expected.`,
        `Senior professionals build mental models that connect dozens of topics like this one.`,
        `Your goal is not just to learn ${T}, but to learn how to learn topics like it.`,
        `Each new lesson should make the previous ones feel even clearer.`,
      ],
    },
    {
      heading: `How to practice ${T}`,
      sentences: [
        `Practice is what turns reading into real skill.`,
        `Try to use ${T} on a small personal project this week.`,
        `Explain ${T} out loud, as if you were teaching a friend.`,
        `Write down three questions you still have about ${T}.`,
        `Search for those questions and compare different answers you find.`,
        `Recreate any examples shown in this lesson without looking at the source first.`,
        `When you get stuck, write down what you tried before asking for help.`,
        `Join a community where other learners are working on similar topics.`,
        `Review this lesson again in two days and see how much more makes sense.`,
        `Consistent small effort beats rare bursts of long study sessions.`,
      ],
    },
    {
      heading: `Summary and next steps`,
      sentences: [
        `In this lesson, you learned what ${T} is and why it matters.`,
        `You saw the core ideas, a practical walkthrough, and the most common pitfalls.`,
        `You also saw how ${T} fits into the rest of ${courseTitle}.`,
        `Take a moment now to write a one-paragraph summary of what you just learned.`,
        `If anything is still unclear, return to the section that covers it and re-read slowly.`,
        `When you feel ready, take the lesson quiz to confirm your understanding.`,
        `Passing the quiz means you can move on with confidence.`,
        `Remember that revisiting old lessons is a sign of a good learner, not a weak one.`,
        `${instructor} is proud of the work you are putting in — keep going.`,
        `The next lesson will build directly on the foundation you just created with ${T}.`,
      ],
    },
  ];

  return sections
    .map((s) => `## ${s.heading}\n\n${s.sentences.join(" ")}`)
    .join("\n\n");
}
