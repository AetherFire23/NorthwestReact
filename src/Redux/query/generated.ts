import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    putChatCreateChatroom: build.mutation<
      PutChatCreateChatroomApiResponse,
      PutChatCreateChatroomApiArg
    >({
      query: (queryArg) => ({
        url: `/Chat/CreateChatroom`,
        method: "PUT",
        params: {
          playerGuid: queryArg.playerGuid,
          newRoomGuid: queryArg.newRoomGuid,
        },
      }),
    }),
    putChatLeaveChatRoom: build.mutation<
      PutChatLeaveChatRoomApiResponse,
      PutChatLeaveChatRoomApiArg
    >({
      query: (queryArg) => ({
        url: `/Chat/LeaveChatRoom`,
        method: "PUT",
        params: {
          playerId: queryArg.playerId,
          roomToLeave: queryArg.roomToLeave,
        },
      }),
    }),
    putChatPutNewMessageToServer: build.mutation<
      PutChatPutNewMessageToServerApiResponse,
      PutChatPutNewMessageToServerApiArg
    >({
      query: (queryArg) => ({
        url: `/Chat/PutNewMessageToServer`,
        method: "PUT",
        params: {
          guid: queryArg.guid,
          roomId: queryArg.roomId,
          receivedMessage: queryArg.receivedMessage,
        },
      }),
    }),
    getGamecontrollerGameState: build.query<
      GetGamecontrollerGameStateApiResponse,
      GetGamecontrollerGameStateApiArg
    >({
      query: (queryArg) => ({
        url: `/gamecontroller/GameState`,
        params: {
          playerId: queryArg.playerId,
          lastTimeStamp: queryArg.lastTimeStamp,
        },
      }),
    }),
    putGamecontrollerExecuteGameTask: build.mutation<
      PutGamecontrollerExecuteGameTaskApiResponse,
      PutGamecontrollerExecuteGameTaskApiArg
    >({
      query: (queryArg) => ({
        url: `/gamecontroller/ExecuteGameTask`,
        method: "PUT",
        body: queryArg.body,
        params: { playerId: queryArg.playerId, taskCode: queryArg.taskCode },
      }),
    }),
    putGamecontrollerUpdatePlayerPosition: build.mutation<
      PutGamecontrollerUpdatePlayerPositionApiResponse,
      PutGamecontrollerUpdatePlayerPositionApiArg
    >({
      query: (queryArg) => ({
        url: `/gamecontroller/UpdatePlayerPosition`,
        method: "PUT",
        params: { playerId: queryArg.playerId, x: queryArg.x, y: queryArg.y },
      }),
    }),
    putGamecontrollerTransferItem: build.mutation<
      PutGamecontrollerTransferItemApiResponse,
      PutGamecontrollerTransferItemApiArg
    >({
      query: (queryArg) => ({
        url: `/gamecontroller/TransferItem`,
        method: "PUT",
        params: {
          targetId: queryArg.targetId,
          ownerId: queryArg.ownerId,
          itemId: queryArg.itemId,
          gameId: queryArg.gameId,
        },
      }),
    }),
    putGamecontrollerChangeRoom: build.mutation<
      PutGamecontrollerChangeRoomApiResponse,
      PutGamecontrollerChangeRoomApiArg
    >({
      query: (queryArg) => ({
        url: `/gamecontroller/ChangeRoom`,
        method: "PUT",
        params: {
          playerId: queryArg.playerId,
          targetRoomName: queryArg.targetRoomName,
        },
      }),
    }),
    getMainmenuGetMainMenuState: build.query<
      GetMainmenuGetMainMenuStateApiResponse,
      GetMainmenuGetMainMenuStateApiArg
    >({
      query: (queryArg) => ({
        url: `/mainmenu/GetMainMenuState`,
        params: { userId: queryArg.userId },
      }),
    }),
    postMainmenuCreateLobby: build.mutation<
      PostMainmenuCreateLobbyApiResponse,
      PostMainmenuCreateLobbyApiArg
    >({
      query: (queryArg) => ({
        url: `/mainmenu/CreateLobby`,
        method: "POST",
        params: { userId: queryArg.userId },
      }),
    }),
    postMainmenuJoinLobby: build.mutation<
      PostMainmenuJoinLobbyApiResponse,
      PostMainmenuJoinLobbyApiArg
    >({
      query: (queryArg) => ({
        url: `/mainmenu/joinLobby`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postMainmenuStartGame: build.mutation<
      PostMainmenuStartGameApiResponse,
      PostMainmenuStartGameApiArg
    >({
      query: (queryArg) => ({
        url: `/mainmenu/StartGame`,
        method: "POST",
        params: { lobbyId: queryArg.lobbyId },
      }),
    }),
    postUsersLogin: build.mutation<
      PostUsersLoginApiResponse,
      PostUsersLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/users/Login`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postUsersRegister: build.mutation<
      PostUsersRegisterApiResponse,
      PostUsersRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/users/Register`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getUsersTest: build.query<GetUsersTestApiResponse, GetUsersTestApiArg>({
      query: () => ({ url: `/users/test` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type PutChatCreateChatroomApiResponse = unknown;
export type PutChatCreateChatroomApiArg = {
  playerGuid?: string;
  newRoomGuid?: string;
};
export type PutChatLeaveChatRoomApiResponse = unknown;
export type PutChatLeaveChatRoomApiArg = {
  playerId?: string;
  roomToLeave?: string;
};
export type PutChatPutNewMessageToServerApiResponse = unknown;
export type PutChatPutNewMessageToServerApiArg = {
  guid?: string;
  roomId?: string;
  receivedMessage?: string;
};
export type GetGamecontrollerGameStateApiResponse =
  /** status 200 Success */ GameStateRead;
export type GetGamecontrollerGameStateApiArg = {
  playerId?: string;
  lastTimeStamp?: string;
};
export type PutGamecontrollerExecuteGameTaskApiResponse = unknown;
export type PutGamecontrollerExecuteGameTaskApiArg = {
  playerId?: string;
  taskCode?: GameTaskCodes;
  body: StringStringTuple[];
};
export type PutGamecontrollerUpdatePlayerPositionApiResponse = unknown;
export type PutGamecontrollerUpdatePlayerPositionApiArg = {
  playerId?: string;
  x?: number;
  y?: number;
};
export type PutGamecontrollerTransferItemApiResponse = unknown;
export type PutGamecontrollerTransferItemApiArg = {
  targetId?: string;
  ownerId?: string;
  itemId?: string;
  gameId?: string;
};
export type PutGamecontrollerChangeRoomApiResponse = unknown;
export type PutGamecontrollerChangeRoomApiArg = {
  playerId?: string;
  targetRoomName?: string;
};
export type GetMainmenuGetMainMenuStateApiResponse =
  /** status 200 Success */ MainMenuStateRead;
export type GetMainmenuGetMainMenuStateApiArg = {
  userId?: string;
};
export type PostMainmenuCreateLobbyApiResponse =
  /** status 200 Success */ LobbyRead;
export type PostMainmenuCreateLobbyApiArg = {
  userId?: string;
};
export type PostMainmenuJoinLobbyApiResponse = unknown;
export type PostMainmenuJoinLobbyApiArg = {
  body: JoinLobbyRequest;
};
export type PostMainmenuStartGameApiResponse = unknown;
export type PostMainmenuStartGameApiArg = {
  lobbyId?: string;
};
export type PostUsersLoginApiResponse = /** status 200 Success */ LoginResult;
export type PostUsersLoginApiArg = {
  body: LoginRequest;
};
export type PostUsersRegisterApiResponse =
  /** status 200 Success */ UserDtoRead;
export type PostUsersRegisterApiArg = {
  body: RegisterRequest;
};
export type GetUsersTestApiResponse = unknown;
export type GetUsersTestApiArg = void;
export type RoleType = 0 | 1 | 2 | 3 | 4;
export type ItemType = 0 | 1;
export type Item = {
  id?: string;
  ownerId?: string;
  itemType?: ItemType;
};
export type SkillEnum = 0 | 1 | 2;
export type PlayerDto = {
  id?: string;
  gameId?: string;
  userId?: string;
  currentGameRoomId?: string;
  profession?: RoleType;
  items?: Item[] | null;
  skills?: SkillEnum[] | null;
  name?: string | null;
  x?: number;
  y?: number;
  z?: number;
  healthPoints?: number;
  actionPoints?: number;
};
export type Message = {
  id?: string;
  senderName?: string | null;
  text?: string | null;
  gameId?: string;
  roomId?: string;
  created?: string | null;
};
export type RoleName = 0 | 1 | 2;
export type Role = {
  id?: string;
  roleName?: RoleName;
  userRoles?: UserRole[] | null;
};
export type RoleRead = {
  id?: string;
  roleName?: RoleName;
  userRoles?: UserRole[] | null;
};
export type UserRole = {
  id?: string;
  user?: User | null;
  role?: Role | null;
};
export type UserRoleRead = {
  id?: string;
  user?: User | null;
  role?: RoleRead | null;
};
export type Lobby = {
  id?: string;
  userLobbies?: UserLobby[] | null;
};
export type LobbyRead = {
  id?: string;
  userLobbies?: UserLobby[] | null;
  usersInLobby?: User[] | null;
};
export type UserLobby = {
  userId?: string;
  user?: User | null;
  lobbyId?: string;
  lobby?: Lobby | null;
  id?: string;
};
export type UserLobbyRead = {
  userId?: string;
  user?: User | null;
  lobbyId?: string;
  lobby?: LobbyRead | null;
  id?: string;
};
export type User = {
  id?: string;
  name?: string | null;
  email?: string | null;
  passwordHash?: string | null;
  players?: Player[] | null;
  userRoles?: UserRole[] | null;
  userLobbies?: UserLobby[] | null;
};
export type Game = {
  id?: string;
  nextTick?: string;
  isActive?: boolean;
  playersInGame: Player[] | null;
};
export type GameRead = {
  id?: string;
  nextTick?: string;
  isActive?: boolean;
  playersInGame: Player[] | null;
};
export type UserRead = {
  id?: string;
  name?: string | null;
  email?: string | null;
  passwordHash?: string | null;
  players?: Player[] | null;
  userRoles?: UserRoleRead[] | null;
  userLobbies?: UserLobbyRead[] | null;
  lobbies?: LobbyRead[] | null;
  games?: GameRead[] | null;
};
export type Player = {
  id?: string;
  currentGameRoomId?: string;
  profession?: RoleType;
  x?: number;
  y?: number;
  z?: number;
  name?: string | null;
  healthPoints?: number;
  actionPoints?: number;
  userId?: string;
  user?: User | null;
  gameId?: string;
  game?: Game | null;
};
export type StringStringValueTuple = {
  item1?: string | null;
  item2?: string | null;
};
export type PlayerRead = {
  taskParam?: StringStringValueTuple;
  id?: string;
  currentGameRoomId?: string;
  profession?: RoleType;
  x?: number;
  y?: number;
  z?: number;
  name?: string | null;
  healthPoints?: number;
  actionPoints?: number;
  userId?: string;
  user?: UserRead | null;
  gameId?: string;
  game?: GameRead | null;
};
export type PrivateChatRoomParticipant = {
  id?: string;
  roomId?: string;
  participantId?: string;
};
export type Log = {
  id?: string;
  gameId?: string;
  triggeringPlayerId?: string;
  roomId?: string;
  isPublic?: boolean;
  eventText?: string | null;
  created?: string | null;
  createdBy?: string | null;
};
export type RoomType = 0 | 1;
export type Station = {
  id?: string;
  gameId?: string;
  name?: string | null;
  serializedProperties?: string | null;
  isLandmass?: boolean;
  isActive?: boolean;
  roomName?: string | null;
};
export type StationRead = {
  taskParam?: StringStringValueTuple;
  id?: string;
  gameId?: string;
  name?: string | null;
  serializedProperties?: string | null;
  isLandmass?: boolean;
  isActive?: boolean;
  roomName?: string | null;
};
export type RoomDto = {
  id?: string;
  gameId?: string;
  name?: string | null;
  items?: Item[] | null;
  players?: Player[] | null;
  roomType?: RoomType;
  stations?: Station[] | null;
  isLandmass?: boolean;
  x?: number;
  y?: number;
};
export type RoomDtoRead = {
  taskParam?: StringStringValueTuple;
  id?: string;
  gameId?: string;
  name?: string | null;
  items?: Item[] | null;
  players?: PlayerRead[] | null;
  roomType?: RoomType;
  stations?: StationRead[] | null;
  isLandmass?: boolean;
  x?: number;
  y?: number;
};
export type PrivateChatRoom = {
  id?: string;
  chatRoomName?: string | null;
};
export type GameState = {
  playerDTO?: PlayerDto | null;
  newMessages?: Message[] | null;
  players?: Player[] | null;
  privateChatRoomParticipants?: PrivateChatRoomParticipant[] | null;
  logs?: Log[] | null;
  rooms?: RoomDto[] | null;
  timeStamp?: string | null;
  serializedLayout?: string | null;
  privateChatRooms?: PrivateChatRoom[] | null;
  stations?: Station[] | null;
};
export type GameStateRead = {
  playerDTO?: PlayerDto | null;
  localPlayerRoom?: RoomDtoRead | null;
  newMessages?: Message[] | null;
  players?: PlayerRead[] | null;
  privateChatRoomParticipants?: PrivateChatRoomParticipant[] | null;
  logs?: Log[] | null;
  rooms?: RoomDtoRead[] | null;
  timeStamp?: string | null;
  serializedLayout?: string | null;
  privateChatRooms?: PrivateChatRoom[] | null;
  stations?: StationRead[] | null;
  gameId?: string;
  playerUID?: string;
};
export type GameTaskCodes =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22;
export type StringStringTuple = {
  item1?: string | null;
  item2?: string | null;
};
export type LobbyDto = {
  id?: string;
  usersInLobby?: User[] | null;
};
export type LobbyDtoRead = {
  id?: string;
  usersInLobby?: UserRead[] | null;
};
export type GameDto = {
  id?: string;
  playersInGameCount?: number;
  created?: string;
};
export type UserDto = {
  id?: string;
  name?: string | null;
  roleNames?: RoleName[] | null;
  players?: Player[] | null;
  queuedLobbies?: LobbyDto[] | null;
  activeGames?: GameDto[] | null;
  availableLobbies?: Lobby[] | null;
};
export type UserDtoRead = {
  id?: string;
  name?: string | null;
  roleNamesAsString?: string[] | null;
  roleNames?: RoleName[] | null;
  players?: PlayerRead[] | null;
  queuedLobbies?: LobbyDtoRead[] | null;
  activeGames?: GameDto[] | null;
  availableLobbies?: LobbyRead[] | null;
};
export type MainMenuState = {
  userDto?: UserDto | null;
  timeStamp?: string | null;
};
export type MainMenuStateRead = {
  userDto?: UserDtoRead | null;
  timeStamp?: string | null;
};
export type JoinLobbyRequest = {
  userId?: string;
  lobbyId?: string;
};
export type LoginResult = {
  token?: string | null;
  userId?: string;
};
export type LoginRequest = {
  userName?: string | null;
  passwordAttempt?: string | null;
};
export type RegisterRequest = {
  userName?: string | null;
  password?: string | null;
  email?: string | null;
};
export const {
  usePutChatCreateChatroomMutation,
  usePutChatLeaveChatRoomMutation,
  usePutChatPutNewMessageToServerMutation,
  useGetGamecontrollerGameStateQuery,
  usePutGamecontrollerExecuteGameTaskMutation,
  usePutGamecontrollerUpdatePlayerPositionMutation,
  usePutGamecontrollerTransferItemMutation,
  usePutGamecontrollerChangeRoomMutation,
  useGetMainmenuGetMainMenuStateQuery,
  usePostMainmenuCreateLobbyMutation,
  usePostMainmenuJoinLobbyMutation,
  usePostMainmenuStartGameMutation,
  usePostUsersLoginMutation,
  usePostUsersRegisterMutation,
  useGetUsersTestQuery,
} = injectedRtkApi;
