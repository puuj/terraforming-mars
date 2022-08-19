import {CardName} from '../../../common/cards/CardName';
import {CardManifest} from '../CardManifest';
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
import {HorizontalIntegration} from './HorizontalIntegration';
import {IceAge} from './IceAge';
import {PatentPortfolio} from './PatentPortfolio';
import {Spies} from './Spies';
import {Uno} from './Uno';
import {Windfall} from './Windfall';
import {ExecutiveOrder} from './ExecutiveOrder';

export const COMMUNITY_CARD_MANIFEST = new CardManifest({
  module: 'community',
  projectCards: [
    {cardName: CardName.DARK_HORSE, Factory: DarkHorse},
    {cardName: CardName.DROUGHT, Factory: Drought},
    {cardName: CardName.FIRES, Factory: Fires},
    {cardName: CardName.FORCED_PARTNERSHIP, Factory: ForcedPartnership},
    {cardName: CardName.HORIZONTAL_INTEGRATION, Factory: HorizontalIntegration},
    {cardName: CardName.ICE_AGE, Factory: IceAge},
    {cardName: CardName.PATENT_PORTFOLIO, Factory: PatentPortfolio},
    {cardName: CardName.SPIES, Factory: Spies},
    {cardName: CardName.UNO, Factory: Uno},
    {cardName: CardName.WINDFALL, Factory: Windfall},
  ],
  corporationCards: [
    {cardName: CardName.AGRICOLA_INC, Factory: AgricolaInc},
    {cardName: CardName.PROJECT_WORKSHOP, Factory: ProjectWorkshop},
    {cardName: CardName.INCITE, Factory: Incite, compatibility: 'turmoil'},
    {cardName: CardName.PLAYWRIGHTS, Factory: Playwrights},
    {cardName: CardName.CURIOSITY_II, Factory: CuriosityII},
    {cardName: CardName.MIDAS, Factory: Midas},
  ],
  preludeCards: [
    {cardName: CardName.RESEARCH_GRANT, Factory: ResearchGrant},
    {
      cardName: CardName.VALUABLE_GASES,
      Factory: ValuableGases,
      compatibility: 'venus',
    },
    {
      cardName: CardName.VENUS_FIRST,
      Factory: VenusFirst,
      compatibility: 'venus',
    },
    {
      cardName: CardName.AEROSPACE_MISSION,
      Factory: AerospaceMission,
      compatibility: 'colonies',
    },
    {
      cardName: CardName.TRADE_ADVANCE,
      Factory: TradeAdvance,
      compatibility: 'colonies',
    },
    {
      cardName: CardName.POLITICAL_UPRISING,
      Factory: PoliticalUprising,
      compatibility: 'turmoil',
    },
    {
      cardName: CardName.BY_ELECTION,
      Factory: ByElection,
      compatibility: 'turmoil',
    },
    {cardName: CardName.EXECUTIVE_ORDER, Factory: ExecutiveOrder, compatibility: 'turmoil'},
  ],
});
