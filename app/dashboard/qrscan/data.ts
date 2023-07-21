// !CHANGEME: Ini cuma dummy data, nanti diganti schema dengan POST requests
export const DummyPresensiData = {
  id: "1a8e8ac8-d3a6-4580-90c6-524febea66b5",
  name: "Muhammad Fathan Ridhwan",

  // kalo internal cuma ada NIM, kalo external
  nim: 69524,
  ktp: 3603298463950009,

  isInternal: false,

  state: {
    pilihan: "GDC UMN",
    isEligible: false,
    masuk: {
      isHadir: false,
      presensiAt: new Date(Date.now()).toLocaleString(),
    },
    keluar: {
      isHadir: false,
      presensiAt: null,
    },
  },

  malpun: {
    isEligible: false,
    isHadir: false,
    presensiAt: null,
  },
};
