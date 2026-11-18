import ComputerLaunch from '../lib/Rules/ComputerLaunch';
import ComputerSpaceshipPart from '../lib/Rules/ComputerSpaceshipPart';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Layout from '@civ-clone/core-spaceship/Layout';
import Part from '@civ-clone/core-spaceship/Part';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Slot from '@civ-clone/core-spaceship/Slot';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';
import { expect } from 'chai';

class Structural extends Part {}
class Module extends Part {}

const setUp = () => {
  const rules = new RuleRegistry(),
    spaceship = new Spaceship(
      new Player(rules),
      new Layout(1, 1, [new Slot(0, 0, 1, 1, [Structural, Module])]),
      rules
    );

  return { rules, spaceship };
};

describe('ComputerSpaceshipPart', (): void => {
  it('answers nothing with no rule, so the client chooses for itself', (): void => {
    const { rules, spaceship } = setUp();

    expect(
      rules.process(ComputerSpaceshipPart, spaceship, [Structural], [])
    ).to.eql([]);
  });

  it("gives the rule set's choice, from what's available and being built", (): void => {
    const { rules, spaceship } = setUp();

    rules.register(
      new ComputerSpaceshipPart(
        new Criterion(
          (ship: Spaceship, available: (typeof Part)[]): boolean =>
            available.length > 0
        ),
        new Effect(
          (
            ship: Spaceship,
            available: (typeof Part)[],
            building: (typeof Part)[]
          ): typeof Part | null =>
            available.find((PartType) => !building.includes(PartType)) ?? null
        )
      )
    );

    expect(
      rules.process(
        ComputerSpaceshipPart,
        spaceship,
        [Structural, Module],
        [Structural]
      )
    ).to.eql([Module]);
    expect(
      rules.process(
        ComputerSpaceshipPart,
        spaceship,
        [Structural],
        [Structural]
      )
    ).to.eql([null]);
    expect(rules.process(ComputerSpaceshipPart, spaceship, [], [])).to.eql([]);
  });
});

describe('ComputerLaunch', (): void => {
  it("answers nothing with no rule, and the rule set's decision with one", (): void => {
    const { rules, spaceship } = setUp();

    expect(rules.process(ComputerLaunch, spaceship)).to.eql([]);

    rules.register(
      new ComputerLaunch(
        new Effect((ship: Spaceship): boolean => ship === spaceship)
      )
    );

    expect(rules.process(ComputerLaunch, spaceship)).to.eql([true]);
  });
});
