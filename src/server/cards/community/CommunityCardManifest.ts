import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import {AgricolaInc} from './AgricolaInc';
import {Incite} from './Incite';
import {Playwrights} from './Playwrights';
import {ProjectWorkshop} from './ProjectWorkshop';
import {ResearchGrant} from './ResearchGrant';
import {ValuableGases} from './ValuableGases';
import {VenusFirst} from './VenusFirst';
import {AerospaceMission} from './AerospaceMission';
import {TradeAdvance} from './TradeAdvance';
import {PoliticalUprising} from './PoliticalUprising';
import {ByElection} from './ByElection';
import {Midas} from './Midas';
import {CuriosityII} from './CuriosityII';
import {DarkHorse} from './DarkHorse';
import {Drought} from './Drought';
import {Fires} from './Fires';
import {ForcedPartnership} from './ForcedPartnership';
import {HappyBirthday} from './HappyBirthday';
import {HorizontalIntegration} from './HorizontalIntegration';
import {IceAge} from './IceAge';
import {PatentPortfolio} from './PatentPortfolio';
import {Spies} from './Spies';
import {Uno} from './Uno';
import {Windfall} from './Windfall';
import {ExecutiveOrder} from './ExecutiveOrder';
import {UnitedNationsMissionOne} from './UnitedNationsMissionOne';
import {JunkVentures} from './JunkVentures';
import {SpecialDesignProxy} from './SpecialDesignProxy';

export const COMMUNITY_CARD_MANIFEST = new ModuleManifest({
  module: 'community',
  projectCards: {
    [CardName.DARK_HORSE]: {Factory: DarkHorse},
    [CardName.DROUGHT]: {Factory: Drought},
    [CardName.FIRES]: {Factory: Fires},
    [CardName.FORCED_PARTNERSHIP]: {Factory: ForcedPartnership},
    [CardName.HORIZONTAL_INTEGRATION]: {Factory: HorizontalIntegration},
    [CardName.HAPPY_BIRTHDAY]: {Factory: HappyBirthday, instantiate: false},
    [CardName.ICE_AGE]: {Factory: IceAge},
    [CardName.PATENT_PORTFOLIO]: {Factory: PatentPortfolio},
    [CardName.SPIES]: {Factory: Spies},
    [CardName.UNO]: {Factory: Uno},
    [CardName.WINDFALL]: {Factory: Windfall},
    [CardName.SPECIAL_DESIGN_PROXY]: {Factory: SpecialDesignProxy, instantiate: false},
  },
  corporationCards: {
    [CardName.AGRICOLA_INC]: {Factory: AgricolaInc},
    [CardName.PROJECT_WORKSHOP]: {Factory: ProjectWorkshop},
    [CardName.INCITE]: {Factory: Incite, compatibility: 'turmoil'},
    [CardName.PLAYWRIGHTS]: {Factory: Playwrights},
    [CardName.CURIOSITY_II]: {Factory: CuriosityII},
    [CardName.MIDAS]: {Factory: Midas},
    [CardName.UNITED_NATIONS_MISSION_ONE]: {Factory: UnitedNationsMissionOne},
    [CardName.JUNK_VENTURES]: {Factory: JunkVentures},
  },
  preludeCards: {
    [CardName.RESEARCH_GRANT]: {Factory: ResearchGrant},
    [CardName.VALUABLE_GASES]: {Factory: ValuableGases, compatibility: 'venus'},
    [CardName.VENUS_FIRST]: {Factory: VenusFirst, compatibility: 'venus'},
    [CardName.AEROSPACE_MISSION]: {Factory: AerospaceMission, compatibility: 'colonies'},
    [CardName.TRADE_ADVANCE]: {Factory: TradeAdvance, compatibility: 'colonies'},
    [CardName.POLITICAL_UPRISING]: {Factory: PoliticalUprising, compatibility: 'turmoil'},
    [CardName.BY_ELECTION]: {Factory: ByElection, compatibility: 'turmoil'},
    [CardName.EXECUTIVE_ORDER]: {Factory: ExecutiveOrder, compatibility: 'turmoil'},
  },



});
