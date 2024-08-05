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
    getGameGetGameState: build.query<
      GetGameGetGameStateApiResponse,
      GetGameGetGameStateApiArg
    >({
      query: (queryArg) => ({
        url: `/game/GetGameState`,
        params: {
          playerId: queryArg.playerId,
          lastTimeStamp: queryArg.lastTimeStamp,
        },
      }),
    }),
    putGameExecuteTask: build.mutation<
      PutGameExecuteTaskApiResponse,
      PutGameExecuteTaskApiArg
    >({
      query: (queryArg) => ({
        url: `/game/executeTask`,
        method: "PUT",
        body: queryArg.body,
        params: { playerId: queryArg.playerId, taskCode: queryArg.taskCode },
      }),
    }),
    putGameUpdateplayerposition: build.mutation<
      PutGameUpdateplayerpositionApiResponse,
      PutGameUpdateplayerpositionApiArg
    >({
      query: (queryArg) => ({
        url: `/game/updateplayerposition`,
        method: "PUT",
        params: { playerId: queryArg.playerId, x: queryArg.x, y: queryArg.y },
      }),
    }),
    putGameTransferitem: build.mutation<
      PutGameTransferitemApiResponse,
      PutGameTransferitemApiArg
    >({
      query: (queryArg) => ({
        url: `/game/transferitem`,
        method: "PUT",
        params: {
          targetId: queryArg.targetId,
          itemOwnerId: queryArg.itemOwnerId,
          itemId: queryArg.itemId,
          gameId: queryArg.gameId,
        },
      }),
    }),
    putGameChangeroom: build.mutation<
      PutGameChangeroomApiResponse,
      PutGameChangeroomApiArg
    >({
      query: (queryArg) => ({
        url: `/game/changeroom`,
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
    postMainmenuCreatelobby: build.mutation<
      PostMainmenuCreatelobbyApiResponse,
      PostMainmenuCreatelobbyApiArg
    >({
      query: (queryArg) => ({
        url: `/mainmenu/createlobby`,
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
        url: `/users/login`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postUsersTokenlogin: build.mutation<
      PostUsersTokenloginApiResponse,
      PostUsersTokenloginApiArg
    >({
      query: () => ({ url: `/users/tokenlogin`, method: "POST" }),
    }),
    postUsersRegister: build.mutation<
      PostUsersRegisterApiResponse,
      PostUsersRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/users/register`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getUsersLoginas: build.query<
      GetUsersLoginasApiResponse,
      GetUsersLoginasApiArg
    >({
      query: (queryArg) => ({
        url: `/users/loginas`,
        params: { roleType: queryArg.roleType },
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
export type GetGameGetGameStateApiResponse = /** status 200 OK */ GameStateRead;
export type GetGameGetGameStateApiArg = {
  playerId?: string;
  lastTimeStamp?: string;
};
export type PutGameExecuteTaskApiResponse = unknown;
export type PutGameExecuteTaskApiArg = {
  playerId?: string;
  taskCode?: GameTaskCodes;
  body: GameTaskTargetInfo[][];
};
export type PutGameUpdateplayerpositionApiResponse = unknown;
export type PutGameUpdateplayerpositionApiArg = {
  playerId?: string;
  x?: number;
  y?: number;
};
export type PutGameTransferitemApiResponse = unknown;
export type PutGameTransferitemApiArg = {
  targetId?: string;
  itemOwnerId?: string;
  itemId?: string;
  gameId?: string;
};
export type PutGameChangeroomApiResponse = unknown;
export type PutGameChangeroomApiArg = {
  playerId?: string;
  targetRoomName?: string;
};
export type GetMainmenuGetMainMenuStateApiResponse =
  /** status 200 OK */ MainMenuStateRead;
export type GetMainmenuGetMainMenuStateApiArg = {
  userId?: string;
};
export type PostMainmenuCreatelobbyApiResponse = /** status 200 OK */ LobbyRead;
export type PostMainmenuCreatelobbyApiArg = {
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
export type PostUsersLoginApiResponse = /** status 200 OK */ LoginResult;
export type PostUsersLoginApiArg = {
  body: LoginRequest;
};
export type PostUsersTokenloginApiResponse = /** status 200 OK */ LoginResult;
export type PostUsersTokenloginApiArg = void;
export type PostUsersRegisterApiResponse = /** status 200 OK */ UserDtoRead;
export type PostUsersRegisterApiArg = {
  body: RegisterRequest;
};
export type GetUsersLoginasApiResponse = /** status 200 OK */ AutoLoginResult;
export type GetUsersLoginasApiArg = {
  roleType?: RoleType;
};
export type GetUsersTestApiResponse = unknown;
export type GetUsersTestApiArg = void;
export type RoleType =
  | "Commander"
  | "Medic"
  | "Sailor"
  | "Cook"
  | "Engineer"
  | "Engineer2"
  | "Engineer3"
  | "Engineer4";
export type ItemType = "Wrench" | "Hose";
export type Item = {
  ownerId?: string;
  itemType?: ItemType;
  id: string;
};
export type Skills = "CookBonus" | "AttackBonus" | "ShootLaser";
export type PlayerDto = {
  id?: string;
  gameId?: string;
  userId?: string;
  currentGameRoomId?: string;
  profession?: RoleType;
  items: Item[];
  skills?: Skills[] | null;
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
export type RoleName = "PereNoel" | "Standard" | "Undefined";
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
  id: string;
};
export type UserLobbyRead = {
  userId?: string;
  user?: User | null;
  lobbyId?: string;
  lobby?: LobbyRead | null;
  id: string;
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
export type UserRead = {
  id?: string;
  name?: string | null;
  email?: string | null;
  passwordHash?: string | null;
  players?: Player[] | null;
  userRoles?: UserRoleRead[] | null;
  userLobbies?: UserLobbyRead[] | null;
  lobbies?: LobbyRead[] | null;
  games?: Game[] | null;
};
export type Player = {
  id?: string;
  currentGameRoomId?: string;
  profession?: RoleType;
  x: number;
  y: number;
  z?: number;
  name?: string | null;
  healthPoints?: number;
  actionPoints?: number;
  userId?: string;
  user?: User | null;
  gameId?: string;
  game?: Game | null;
};
export type PlayerRead = {
  id?: string;
  currentGameRoomId?: string;
  profession?: RoleType;
  x: number;
  y: number;
  z?: number;
  name?: string | null;
  healthPoints?: number;
  actionPoints?: number;
  userId?: string;
  user?: UserRead | null;
  gameId?: string;
  game?: Game | null;
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
  created: string;
  createdBy?: string | null;
};
export type RoomType = "Start" | "Second";
export type Station = {
  id?: string;
  gameId?: string;
  name?: string | null;
  serializedProperties?: string | null;
  isLandmass?: boolean;
  isActive?: boolean;
  roomName?: string | null;
};
export type RoomDto = {
  gameId?: string;
  name?: string | null;
  items: Item[];
  players?: Player[] | null;
  roomType?: RoomType;
  stations?: Station[] | null;
  isLandmass?: boolean;
  x?: number;
  y?: number;
  id: string;
};
export type StringStringValueTuple = {
  item1?: string | null;
  item2?: string | null;
};
export type RoomDtoRead = {
  taskParam?: StringStringValueTuple;
  gameId?: string;
  name?: string | null;
  items: Item[];
  players?: PlayerRead[] | null;
  roomType?: RoomType;
  stations?: Station[] | null;
  isLandmass?: boolean;
  x?: number;
  y?: number;
  id: string;
};
export type PrivateChatRoom = {
  id?: string;
  chatRoomName?: string | null;
};
export type GameTaskCodes =
  | "ChargeCannon"
  | "FireCannon"
  | "RepairCannon"
  | "RaiseSail"
  | "LowerSail"
  | "SetSail"
  | "RepairSail"
  | "Watch"
  | "ChargeMortar"
  | "FireMortar"
  | "RepairMortar"
  | "Expedition"
  | "Evacuation"
  | "Fish"
  | "Fire"
  | "RaiseAnchor"
  | "LowererAnchor"
  | "CookMeat"
  | "CookFish"
  | "CookStew"
  | "Lock"
  | "Unlock"
  | "CraftTask"
  | "InvalidTestTask"
  | "TestTaskInvisible"
  | "TestTaskNoTargets"
  | "TestTaskWithTargets";
export type TaskRequirement = {
  description?: string | null;
  fulfillsRequirement?: boolean;
};
export type GameTaskTargetInfo = {
  id: string;
  appearanceName: string;
  name: string;
};
export type GameTaskPromptInfo = {
  promptText?: string | null;
  hasTarget?: boolean;
  taskTargets: GameTaskTargetInfo[];
  maximumTargets: number;
  minimumTargets: number;
};
export type GameTaskAvailabilityResult = {
  gameTaskName: string;
  gameTaskCode: GameTaskCodes;
  requirements: TaskRequirement[];
  taskPromptInfos: GameTaskPromptInfo[];
};
export type GameTaskAvailabilityResultRead = {
  gameTaskName: string;
  gameTaskCode: GameTaskCodes;
  requirements: TaskRequirement[];
  taskPromptInfos: GameTaskPromptInfo[];
  canExecuteTask?: boolean;
};
export type GameState = {
  playerDto: PlayerDto;
  newMessages: Message[];
  players: Player[];
  privateChatRoomParticipants: PrivateChatRoomParticipant[];
  logs: Log[];
  rooms: RoomDto[];
  timeStamp?: string | null;
  serializedLayout?: string | null;
  privateChatRooms?: PrivateChatRoom[] | null;
  stations?: Station[] | null;
  visibleGameTasks: GameTaskAvailabilityResult[];
};
export type GameStateRead = {
  playerDto: PlayerDto;
  localPlayerRoom: RoomDtoRead;
  newMessages: Message[];
  players: PlayerRead[];
  privateChatRoomParticipants: PrivateChatRoomParticipant[];
  logs: Log[];
  rooms: RoomDtoRead[];
  timeStamp?: string | null;
  serializedLayout?: string | null;
  privateChatRooms?: PrivateChatRoom[] | null;
  stations?: Station[] | null;
  visibleGameTasks: GameTaskAvailabilityResultRead[];
  gameId?: string;
  playerUID?: string;
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
export type AutoLoginResult = {
  userName?: string | null;
};
export const {
  usePutChatCreateChatroomMutation,
  usePutChatLeaveChatRoomMutation,
  usePutChatPutNewMessageToServerMutation,
  useGetGameGetGameStateQuery,
  usePutGameExecuteTaskMutation,
  usePutGameUpdateplayerpositionMutation,
  usePutGameTransferitemMutation,
  usePutGameChangeroomMutation,
  useGetMainmenuGetMainMenuStateQuery,
  usePostMainmenuCreatelobbyMutation,
  usePostMainmenuJoinLobbyMutation,
  usePostMainmenuStartGameMutation,
  usePostUsersLoginMutation,
  usePostUsersTokenloginMutation,
  usePostUsersRegisterMutation,
  useGetUsersLoginasQuery,
  useGetUsersTestQuery,
} = injectedRtkApi;
