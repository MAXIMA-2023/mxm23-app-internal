// !CHANGEME: Ini cuma dummy data, nanti diganti schema dengan POST requests
export const DummyPresensiData = {
  id: "1a8e8ac8-d3a6-4580-90c6-524febea66b5",
  name: "Muhammad Fathan Ridhwan",
  nim: 69524,
  isInternal: true,

  state: {
    pilihan: "GDC UMN",
    masuk: {
      isHadir: true,
      presensiAt: new Date(Date.now()).toLocaleString(),
    },
    keluar: {
      isHadir: false,
      presensiAt: null,
    },
  },
  malpun: {
    isHadir: false,
    presensiAt: null,
  },
};
