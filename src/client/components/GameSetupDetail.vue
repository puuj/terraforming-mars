<template>
        <div id="game-setup-detail" class="game-setup-detail-container">
          <ul>
            <li><div class="setup-item" v-i18n>Expansion:</div>
              <div v-if="gameOptions.corporateEra" class="create-game-expansion-icon expansion-icon-CE" title="Corporate Era"></div>
              <div v-else class="create-game-expansion-icon expansion-icon-CE expansion-disabled" title="Corporate Era disabled"></div>
              <div v-if="gameOptions.venusNextExtension" class="create-game-expansion-icon expansion-icon-venus" title="Venus"></div>
              <div v-else class="create-game-expansion-icon expansion-icon-venus expansion-disabled" title="Venus disabled"></div>
              <div v-if="gameOptions.preludeExtension" class="create-game-expansion-icon expansion-icon-prelude" title="Preludes"></div>
              <div v-else class="create-game-expansion-icon expansion-icon-prelude expansion-disabled" title="Preludes disabled"></div>
              <div v-if="gameOptions.coloniesExtension" class="create-game-expansion-icon expansion-icon-colony" title="Colonies"></div>
              <div v-else class="create-game-expansion-icon expansion-icon-colony expansion-disabled" title="Colonies disabled"></div>
              <div v-if="gameOptions.turmoilExtension" class="create-game-expansion-icon expansion-icon-turmoil" title="Turmoil"></div>
              <div v-else class="create-game-expansion-icon expansion-icon-turmoil expansion-disabled" title="Turmoil disabled"></div>
              <div v-if="gameOptions.promoCardsOption" class="create-game-expansion-icon expansion-icon-promo" title="Promos"></div>
              <div v-else class="create-game-expansion-icon expansion-icon-promo expansion-disabled" title="Promos disabled"></div>
              <div v-if="gameOptions.aresExtension" class="create-game-expansion-icon expansion-icon-ares" title="Ares"></div>
              <div v-else class="create-game-expansion-icon expansion-icon-ares expansion-disabled" title="Ares disabled"></div>
              <div v-if="gameOptions.moonExpansion" class="create-game-expansion-icon expansion-icon-themoon" title="The Moon"></div>
              <div v-else class="create-game-expansion-icon expansion-icon-themoon expansion-disabled" title="The Moon disabled"></div>
              <div v-if="gameOptions.pathfindersExpansion" class="create-game-expansion-icon expansion-icon-pathfinders" title="Pathfinders"></div>
              <div v-else class="create-game-expansion-icon expansion-icon-pathfinders expansion-disabled" title="Pathfinders disabled"></div>
              <div v-if="gameOptions.communityCardsOption" class="create-game-expansion-icon expansion-icon-community" title="Community"></div>
              <div v-else class="create-game-expansion-icon expansion-icon-community expansion-disabled" title="Community disabled"></div>
              <div v-if="isPoliticalAgendasOn" class="create-game-expansion-icon expansion-icon-agendas" title="Turmoil Agendas"></div>
              <div v-else class="create-game-expansion-icon expansion-icon-agendas expansion-disabled" title="Turmoil Agendas disabled"></div>
              <div v-if="gameOptions.ceoExtension" class="create-game-expansion-icon expansion-icon-ceo" title="CEOs"></div>
              <div v-else class="create-game-expansion-icon expansion-icon-ceo expansion-disabled" title="CEOs disabled"></div>
            </li>

            <li><div class="setup-item" v-i18n>Board:</div>
              <span :class="boardColorClass" v-i18n>{{ gameOptions.boardName }}</span>
              &nbsp;
              <span v-if="gameOptions.shuffleMapOption" class="game-config generic" v-i18n>(randomized tiles)</span>
            </li>

            <li><div class="setup-item" v-i18n>WGT:</div>
              <div v-if="gameOptions.solarPhaseOption" class="game-config generic" v-i18n>On</div>
              <div v-else class="game-config generic" v-i18n>Off</div>
            </li>

            <li v-if="gameOptions.venusNextExtension">
            <div class="setup-item" v-i18n>Venus Terraforming:</div>
              <div v-if="gameOptions.requiresVenusTrackCompletion" class="game-config exception">Mandatory</div>
              <div v-else class="game-config generic" v-i18n>Optional</div>
            </li>
            <li v-if="gameOptions.moonExpansion">
            <div class="setup-item" v-i18n>Moon Terraforming:</div>
              <div v-if="gameOptions.requiresMoonTrackCompletion" class="game-config exception">Mandatory</div>
              <div v-else class="game-config generic" v-i18n>Optional</div>
            </li>

            <li v-if="playerNumber > 1">
              <div class="setup-item" v-i18n>Milestones and Awards:</div>

              <div v-if="gameOptions.randomMA === RandomMAOptionType.NONE" class="game-config generic" v-i18n>Board-defined</div>
              <div v-if="gameOptions.randomMA === RandomMAOptionType.LIMITED" class="game-config generic" v-i18n>Randomized with limited synergy</div>
              <div v-if="gameOptions.randomMA === RandomMAOptionType.UNLIMITED" class="game-config generic" v-i18n>Full randomized</div>
              <div v-if="gameOptions.venusNextExtension && gameOptions.includeVenusMA" class="game-config generic" v-18n>Venus Milestone/Award</div>
              <div v-if="gameOptions.randomMA !== RandomMAOptionType.NONE && gameOptions.includeFanMA" class="game-config generic" v-18n>Include fan Milestones/Awards</div>
            </li>

            <li v-if="playerNumber > 1">
              <div class="setup-item" v-i18n>Draft:</div>
              <div v-if="gameOptions.corporationsDraft" class="game-config exception" v-i18n>Corporation</div>
              <div v-if="gameOptions.initialDraftVariant" class="game-config generic" v-i18n>Initial</div>
              <div v-else class="game-config exception" v-i18n>NO Initial Draft</div>
              <div v-if="gameOptions.draftVariant" class="game-config generic" v-i18n>Research phase</div>
              <div v-else class="game-config exception" v-i18n>NO Research Draft</div>
              <div v-if="!gameOptions.initialDraftVariant && !gameOptions.draftVariant && !gameOptions.corporationsDraft" class="game-config generic" v-i18n>Off</div>
            </li>

            <li v-if="gameOptions.escapeVelocityMode">
              <div class="create-game-expansion-icon expansion-icon-escape-velocity"></div>
              <span>After {{gameOptions.escapeVelocityThreshold}} min, reduce {{gameOptions.escapeVelocityPenalty}} VP every {{gameOptions.escapeVelocityPeriod}} min.</span>
            </li>

            <li v-if="gameOptions.turmoilExtension && gameOptions.removeNegativeGlobalEvents">
              <div class="setup-item" v-i18n>Turmoil:</div>
              <div class="game-config generic" v-i18n>No negative Turmoil event</div>
            </li>

            <li v-if="playerNumber === 1">
              <div class="setup-item" v-i18n>Solo:</div>
              <div class="game-config generic" v-i18n>{{ this.lastSoloGeneration }} Gens</div>
              <div v-if="gameOptions.soloTR" class="game-config generic" v-i18n>63 TR</div>
              <div v-else class="game-config generic" v-i18n>TR all</div>
            </li>

            <li><div class="setup-item" v-i18n>Game configs:</div>
              <div v-if="gameOptions.fastModeOption" class="game-config fastmode" v-i18n>fast mode</div>
              <div v-if="gameOptions.showTimers" class="game-config timer" v-i18n>timer</div>
              <div v-if="gameOptions.showOtherPlayersVP" class="game-config realtime-vp" v-i18n>real-time vp</div>
              <div v-if="gameOptions.undoOption" class="game-config undo" v-i18n>undo</div>
            </li>

            <li v-if="gameOptions.bannedCards.length > 0"><div class="setup-item" v-i18n>Banned cards:</div>{{ gameOptions.bannedCards.join(', ') }}</li>
          </ul>
        </div>
</template>

<script lang="ts">

import Vue from 'vue';
import {GameOptionsModel} from '@/common/models/GameOptionsModel';
import {BoardName} from '@/common/boards/BoardName';
import {RandomMAOptionType} from '@/common/ma/RandomMAOptionType';
import {AgendaStyle} from '@/common/turmoil/Types';

const boardColorClass: Record<BoardName, string> = {
  [BoardName.THARSIS]: 'game-config board-tharsis map',
  [BoardName.HELLAS]: 'game-config board-hellas map',
  [BoardName.ELYSIUM]: 'game-config board-elysium map',
  [BoardName.AMAZONIS]: 'game-config board-amazonis map',
  [BoardName.ARABIA_TERRA]: 'game-config board-arabia_terra map',
  [BoardName.VASTITAS_BOREALIS]: 'game-config board-vastitas_borealis map',
  [BoardName.TERRA_CIMMERIA]: 'game-config board-terra_cimmeria map',
};

export default Vue.extend({
  name: 'game-setup-detail',
  props: {
    playerNumber: {
      type: Number,
    },
    gameOptions: {
      type: Object as () => GameOptionsModel,
    },
    lastSoloGeneration: {
      type: Number,
    },
  },
  computed: {
    isPoliticalAgendasOn(): boolean {
      return (this.gameOptions.politicalAgendasExtension !== AgendaStyle.STANDARD);
    },
    boardColorClass(): string {
      return boardColorClass[this.gameOptions.boardName];
    },
    RandomMAOptionType(): typeof RandomMAOptionType {
      return RandomMAOptionType;
    },
  },
});

</script>
