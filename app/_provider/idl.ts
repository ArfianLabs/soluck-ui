export type SoluckRouletteProgram = {
  version: "0.1.0";
  name: "soluck_roulette_program";
  instructions: [
    {
      name: "initConfig";
      accounts: [
        {
          name: "config";
          isMut: true;
          isSigner: false;
        },
        {
          name: "auth";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "setConfig";
      accounts: [
        {
          name: "config";
          isMut: true;
          isSigner: false;
        },
        {
          name: "auth";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "newAuth";
          type: "publicKey";
        }
      ];
    },
    {
      name: "increaseRouletteCount";
      accounts: [
        {
          name: "config";
          isMut: true;
          isSigner: false;
        },
        {
          name: "auth";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "startRoulette";
      accounts: [
        {
          name: "config";
          isMut: true;
          isSigner: false;
        },
        {
          name: "roulette";
          isMut: true;
          isSigner: false;
        },
        {
          name: "auth";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "createUserAccount";
      accounts: [
        {
          name: "userWinningAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "sender";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "enterRoulette";
      accounts: [
        {
          name: "userWinningAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "roulette";
          isMut: true;
          isSigner: false;
        },
        {
          name: "sender";
          isMut: true;
          isSigner: true;
        },
        {
          name: "fromAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "toAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "setFloorPrice";
      accounts: [
        {
          name: "config";
          isMut: true;
          isSigner: false;
        },
        {
          name: "roulette";
          isMut: true;
          isSigner: false;
        },
        {
          name: "auth";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "address";
          type: "publicKey";
        },
        {
          name: "floorPrice";
          type: "u64";
        }
      ];
    },
    {
      name: "getRandomDecideWinner";
      accounts: [
        {
          name: "config";
          isMut: true;
          isSigner: false;
        },
        {
          name: "roulette";
          isMut: true;
          isSigner: false;
        },
        {
          name: "sender";
          isMut: true;
          isSigner: true;
        },
        {
          name: "feedAccount1";
          isMut: false;
          isSigner: false;
        },
        {
          name: "feedAccount2";
          isMut: false;
          isSigner: false;
        },
        {
          name: "feedAccount3";
          isMut: false;
          isSigner: false;
        },
        {
          name: "fallbackAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "currentFeedsAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rngProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "temp";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "updateWinnerAccount";
      accounts: [
        {
          name: "config";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userWinningAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "sender";
          isMut: true;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "index";
          type: "u64";
        }
      ];
    },
    {
      name: "claimWinnings";
      accounts: [
        {
          name: "roulette";
          isMut: true;
          isSigner: false;
        },
        {
          name: "config";
          isMut: true;
          isSigner: false;
        },
        {
          name: "sender";
          isMut: true;
          isSigner: true;
        },
        {
          name: "fromAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "toAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "configData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "isInit";
            type: "bool";
          },
          {
            name: "rouletteCount";
            type: "u64";
          },
          {
            name: "auth";
            type: "publicKey";
          }
        ];
      };
    },
    {
      name: "rouletteData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "status";
            type: "u8";
          },
          {
            name: "players";
            type: {
              vec: "publicKey";
            };
          },
          {
            name: "values";
            type: {
              vec: "u64";
            };
          },
          {
            name: "winner";
            type: "publicKey";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "userRouletteData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "winningRouletteIndexes";
            type: {
              vec: "u64";
            };
          }
        ];
      };
    },
    {
      name: "escrowData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "player";
            type: "publicKey";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
  events: [
    {
      name: "EnterRouletteEvent";
      fields: [
        {
          name: "from";
          type: "publicKey";
          index: false;
        },
        {
          name: "mint";
          type: "publicKey";
          index: false;
        }
      ];
    },
    {
      name: "WinnerEvent";
      fields: [
        {
          name: "winner";
          type: "publicKey";
          index: false;
        }
      ];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "ConfigAlreadyInitialized";
      msg: "Config already initialized";
    },
    {
      code: 6001;
      name: "NotAuth";
      msg: "Not an authority";
    },
    {
      code: 6002;
      name: "InProgress";
      msg: "Roulette in progress";
    },
    {
      code: 6003;
      name: "NotWinner";
      msg: "Not the winner";
    },
    {
      code: 6004;
      name: "FailedToGetRandomNumber";
      msg: "Failed to get random number";
    }
  ];
};

export const IDL: SoluckRouletteProgram = {
  version: "0.1.0",
  name: "soluck_roulette_program",
  instructions: [
    {
      name: "initConfig",
      accounts: [
        {
          name: "config",
          isMut: true,
          isSigner: false,
        },
        {
          name: "auth",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "setConfig",
      accounts: [
        {
          name: "config",
          isMut: true,
          isSigner: false,
        },
        {
          name: "auth",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "newAuth",
          type: "publicKey",
        },
      ],
    },
    {
      name: "increaseRouletteCount",
      accounts: [
        {
          name: "config",
          isMut: true,
          isSigner: false,
        },
        {
          name: "auth",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "startRoulette",
      accounts: [
        {
          name: "config",
          isMut: true,
          isSigner: false,
        },
        {
          name: "roulette",
          isMut: true,
          isSigner: false,
        },
        {
          name: "auth",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createUserAccount",
      accounts: [
        {
          name: "userWinningAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sender",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "enterRoulette",
      accounts: [
        {
          name: "userWinningAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "roulette",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sender",
          isMut: true,
          isSigner: true,
        },
        {
          name: "fromAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "toAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "setFloorPrice",
      accounts: [
        {
          name: "config",
          isMut: true,
          isSigner: false,
        },
        {
          name: "roulette",
          isMut: true,
          isSigner: false,
        },
        {
          name: "auth",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "address",
          type: "publicKey",
        },
        {
          name: "floorPrice",
          type: "u64",
        },
      ],
    },
    {
      name: "getRandomDecideWinner",
      accounts: [
        {
          name: "config",
          isMut: true,
          isSigner: false,
        },
        {
          name: "roulette",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sender",
          isMut: true,
          isSigner: true,
        },
        {
          name: "feedAccount1",
          isMut: false,
          isSigner: false,
        },
        {
          name: "feedAccount2",
          isMut: false,
          isSigner: false,
        },
        {
          name: "feedAccount3",
          isMut: false,
          isSigner: false,
        },
        {
          name: "fallbackAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "currentFeedsAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rngProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "temp",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateWinnerAccount",
      accounts: [
        {
          name: "config",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userWinningAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sender",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "index",
          type: "u64",
        },
      ],
    },
    {
      name: "claimWinnings",
      accounts: [
        {
          name: "roulette",
          isMut: true,
          isSigner: false,
        },
        {
          name: "config",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sender",
          isMut: true,
          isSigner: true,
        },
        {
          name: "fromAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "toAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "configData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "isInit",
            type: "bool",
          },
          {
            name: "rouletteCount",
            type: "u64",
          },
          {
            name: "auth",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "rouletteData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "status",
            type: "u8",
          },
          {
            name: "players",
            type: {
              vec: "publicKey",
            },
          },
          {
            name: "values",
            type: {
              vec: "u64",
            },
          },
          {
            name: "winner",
            type: "publicKey",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "userRouletteData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "winningRouletteIndexes",
            type: {
              vec: "u64",
            },
          },
        ],
      },
    },
    {
      name: "escrowData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "player",
            type: "publicKey",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "EnterRouletteEvent",
      fields: [
        {
          name: "from",
          type: "publicKey",
          index: false,
        },
        {
          name: "mint",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "WinnerEvent",
      fields: [
        {
          name: "winner",
          type: "publicKey",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "ConfigAlreadyInitialized",
      msg: "Config already initialized",
    },
    {
      code: 6001,
      name: "NotAuth",
      msg: "Not an authority",
    },
    {
      code: 6002,
      name: "InProgress",
      msg: "Roulette in progress",
    },
    {
      code: 6003,
      name: "NotWinner",
      msg: "Not the winner",
    },
    {
      code: 6004,
      name: "FailedToGetRandomNumber",
      msg: "Failed to get random number",
    },
  ],
};
