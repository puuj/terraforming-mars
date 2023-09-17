import {CardName} from '@/common/cards/CardName';
import {ColonyName} from '@/common/colonies/ColonyName';
import {RandomMAOptionType} from '@/common/ma/RandomMAOptionType';
import {GameId} from '@/common/Types';
import {AgendaStyle} from '@/common/turmoil/Types';
import {BoardNameType, NewPlayerModel} from '@/common/game/NewGameConfig';

export interface CreateGameModel {
  allOfficialExpansions: boolean;
  firstIndex: number;
  playersCount: number;
  players: Array<NewPlayerModel>;
  corporateEra: boolean;
  prelude: boolean;
  prelude2Expansion: boolean;
  draftVariant: boolean;
  initialDraft: boolean;
  randomMA: RandomMAOptionType;
  randomFirstPlayer: boolean;
  showOtherPlayersVP: boolean;
  venusNext: boolean;
  colonies: boolean;
  turmoil: boolean;
  bannedCards: Array<CardName>;
  customColonies: Array<ColonyName>;
  customCorporations: Array<CardName>;
  customPreludes: Array<CardName>;
  showBannedCards: boolean;
  showCorporationList: boolean;
  showColoniesList: boolean;
  showPreludesList: boolean;
  board: BoardNameType;
  boards: Array<BoardNameType>;
  seed: number;
  solarPhaseOption: boolean;
  shuffleMapOption: boolean;
  promoCardsOption: boolean;
  communityCardsOption: boolean;
  aresExtension: boolean;
  politicalAgendasExtension: AgendaStyle;
  moonExpansion: boolean;
  pathfindersExpansion: boolean;
  undoOption: boolean;
  showTimers: boolean;
  fastModeOption: boolean;
  removeNegativeGlobalEventsOption: boolean;
  includeVenusMA: boolean;
  includeFanMA: boolean;
  startingCorporations: number;
  soloTR: boolean;
  clonedGameId: GameId | undefined;
  requiresVenusTrackCompletion: boolean;
  requiresMoonTrackCompletion: boolean;
  moonStandardProjectVariant: boolean;
  altVenusBoard: boolean;
  seededGame: boolean;
  escapeVelocityMode: boolean;
  escapeVelocityThreshold: number;
  escapeVelocityBonusSeconds: number;
  escapeVelocityPeriod: number;
  escapeVelocityPenalty: number;
  twoCorpsVariant: boolean;
  ceoExtension: boolean;
  customCeos: Array<CardName>;
  startingCeos: number;
}
