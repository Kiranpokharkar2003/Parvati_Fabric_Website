const categories = [
  {
    label: "Sarees",
    slug: "sarees",
    subcategories: [
      {
        label: "Silk",
        slug: "silk",
        items: [
          { label: "Banarasi", slug: "banarasi" },
          { label: "Contrast", slug: "contrast" },
          { label: "Kanjivaram", slug: "kanjivaram" },
          { label: "Modal Silk", slug: "modalsilk" },
          { label: "Satin", slug: "satin" },
          { label: "Rapier", slug: "rapier" },
          { label: "Tissue", slug: "tissue" },
          { label: "Dharmavaram", slug: "dharmavaram" }
        ]
      },
      {
        label: "Cotton",
        slug: "cotton",
        items: [
          { label: "Modal Cotton", slug: "modalcotton" },
          { label: "Linean Cotton", slug: "lineancottn" },
          { label: "Khadi", slug: "khadi" },
          { label: "Handloom Cotton", slug: "handloomcotton" }
        ]
      },
      {
        label: "Work",
        slug: "work",
        items: [
          { label: "Tried Work", slug: "triedwork" },
          { label: "Embroidery Work", slug: "embroiderywork" },
          { label: "Machin Work", slug: "machinwork" },
          { label: "Zari Work", slug: "zariwork" },
          { label: "Stone Work", slug: "stonework" },
          { label: "Mirror Work", slug: "mirrorwork" },
          { label: "Sequence Work", slug: "sequencework" },
          { label: "Resam Work", slug: "resamwork" },
          { label: "TyleNet Work", slug: "tylenetwork" }
        ]
      },
      {
        label: "Organza",
        slug: "organza",
        items: [
          { label: "Plain", slug: "plain" },
          { label: "Embroidery", slug: "embroidery" },
          { label: "Zari Work", slug: "zariwork" },
          { label: "Stone Work", slug: "stonework" }
        ]
      }
    ]
  },
  {
    label: "Lehengas",
    slug: "lehengas",
    subcategories: ["Bridal", "Sider", "Designer"]
  },
  {
    label: "Kurtis",
    slug: "kurtis",
    subcategories: ["Straight", "Anarkali", "A-Line"]
  },
  {
    label: "Fabrics",
    slug: "fabrics",
    subcategories: ["Cotton", "Silk", "Linen", "Wool", "Denim", "Polyester", "Velvet"]
  }
];

export default categories;