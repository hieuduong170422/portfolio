// Match the inner screen, which occupies about 90% of each phone mockup.
export const imageSizes = {
  hero: "(max-width: 518px) calc(29vw - 14px), 140px",
  // The pinned phone grows to ~290px wide on large screens; under-declaring this blurs screenshots.
  showcase: "(max-width: 383px) 54vw, (max-width: 700px) 230px, (max-width: 1000px) 190px, 300px",
  featureCover: "(max-width: 700px) 131px, (max-width: 900px) 119px, 140px",
  featureDetail: "(max-width: 392px) 50.4vw, (max-width: 700px) 198px, 234px",
};
