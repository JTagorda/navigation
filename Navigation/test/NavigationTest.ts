﻿import * as assert from 'assert';
import * as mocha from 'mocha';
import { StateNavigator, HashHistoryManager, HTML5HistoryManager } from '../src/Navigation';

describe('Navigation', function () {
    describe('State', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
            });            
            test();
        });
        
        function test(){
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Second State', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's', route: 'r' }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
            });            
            test();
        });
        
        function test(){
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('State With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's', route: 'r', trackCrumbTrail: true }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
            });            
            test();
        });
        
        function test(){
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Invalid State', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
        });

        describe('Navigate', function() {
            it('should throw error', function(){
                assert.throws(() => stateNavigator.navigate('s0'), /is not a valid State/);
            });
        });
        
        describe('Navigate Link', function() {
            it('should throw error', function(){
                assert.throws(() => stateNavigator.getNavigationLink('s0'), /is not a valid State/);
            });
        });
    });

    describe('Transition', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.url, '/r1');
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.oldUrl, '/r0');
                assert.equal(stateNavigator.stateContext.previousState, null);
                assert.equal(stateNavigator.stateContext.previousUrl, null);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Transition With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.oldUrl, '/r0');
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.previousUrl, '/r0');
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
            });
        }
    });

    describe('State State', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s');
                stateNavigator.navigate('s');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s']);
                assert.equal(stateNavigator.stateContext.previousState, null);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('State State With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's', route: 'r', trackCrumbTrail: true }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s');
                stateNavigator.navigate('s');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
            });
            test();            
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s']);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
            });
        }
    });
    

    describe('Null State', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
        });

        describe('Navigate', function() {
            it('should throw error', function() {
                assert.throws(() => stateNavigator.navigate(null), /is not a valid State/);            
            });
        });
        
        describe('Navigate Link', function() {
            it('should throw error', function() {
                assert.throws(() => stateNavigator.getNavigationLink(null), /is not a valid State/);
            });
        });
    });
    
    describe('Transition From Without Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0', trackCrumbTrail: false },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                var link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
            });
        }
    });

    describe('Transition With Trail Transition With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs[1].state, stateNavigator.states['s1']);
                assert.ok(!stateNavigator.stateContext.crumbs[0].last);
                assert.ok(stateNavigator.stateContext.crumbs[1].last);
            });
        }
    });
    
    describe('Transition Transition', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldUrl, '/r1');
                assert.equal(stateNavigator.stateContext.previousState, null);
                assert.equal(stateNavigator.stateContext.previousUrl, null);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Refresh With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.refresh();
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getRefreshLink();
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {            
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 2);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs[1].state, stateNavigator.states['s1']);
                assert.ok(!stateNavigator.stateContext.crumbs[0].last);
                assert.ok(stateNavigator.stateContext.crumbs[1].last);
            });
        }
    });

    describe('Refresh', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.refresh();
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getRefreshLink();
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, null);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });
    
    describe('Back With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.oldUrl, '/r2?crumb=%2Fr0&crumb=%2Fr1');
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.previousUrl, '/r0');
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
            });
        }
    });

    describe('Back', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.previousState, null);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Back Two With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3', trackCrumbTrail: true },
                { key: 's4', route: 'r4', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigate('s3');
                stateNavigator.navigate('s4');
                stateNavigator.navigateBack(2);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s3');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s4');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(2);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s4']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 2);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs[1].state, stateNavigator.states['s1']);
                assert.ok(!stateNavigator.stateContext.crumbs[0].last);
                assert.ok(stateNavigator.stateContext.crumbs[1].last);
            });
        }
    });

    describe('Back Two', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' },
                { key: 's3', route: 'r3', trackCrumbTrail: true },
                { key: 's4', route: 'r4', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigate('s3');
                stateNavigator.navigate('s4');
                stateNavigator.navigateBack(2);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s3');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s4');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(2);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s4']);
                assert.equal(stateNavigator.stateContext.previousState, null);
                assert.equal(stateNavigator.stateContext.previousUrl, null);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Back One By One With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigate('s3');
                stateNavigator.navigateBack(1);
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s3');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
            });
        }
    });

    describe('Back One By One', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigate('s3');
                stateNavigator.navigateBack(1);
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s3');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.previousState, null);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Can Navigate Back With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
            });
            test();
        });

        function test() {
            it('should navigate back 2', function() {
                assert.ok(!stateNavigator.canNavigateBack(0));
                assert.ok(stateNavigator.canNavigateBack(1));
                assert.ok(stateNavigator.canNavigateBack(2));
                assert.ok(!stateNavigator.canNavigateBack(3));
            });
        }
    });

    describe('Can Navigate Back', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2' }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
            });
            test();
        });

        function test() {
            it('should not navigate back', function() {
                assert.ok(!stateNavigator.canNavigateBack(0));
                assert.ok(!stateNavigator.canNavigateBack(1));
            });
        }
    });

    describe('Invalid Back With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
            });
            it('should throw error', function() {
                assert.throws(() => stateNavigator.navigateBack(3));
            });
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
            });
            it('should throw error', function() {
                assert.throws(() => stateNavigator.getNavigationBackLink(3), /distance parameter/);
            });
        });
    });

    describe('Invalid Back', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2' }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
            });
            it('should throw error', function() {
                assert.throws(() => stateNavigator.navigateBack(1));
            });
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
            });
            it('should throw error', function() {
                assert.throws(() => stateNavigator.getNavigationBackLink(1), /distance parameter/);
            });
        });
    });

    describe('Back Invalid Back With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(1);
            });
            it('should throw error', function() {
                assert.throws(() => stateNavigator.navigateBack(2), /distance parameter/);
            });
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            it('should throw error', function() {
                assert.throws(() => stateNavigator.getNavigationBackLink(2), /distance parameter/);
            });
        });
    });

    describe('Back Invalid Back', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(1);
            });
            it('should throw error', function() {
                assert.throws(() => stateNavigator.navigateBack(1), /distance parameter/);
            });
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            it('should throw error', function() {
                assert.throws(() => stateNavigator.getNavigationBackLink(1), /distance parameter/);
            });
        });
    });

    describe('Back Refresh With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(1);
                stateNavigator.refresh();
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
                link = stateNavigator.getRefreshLink();
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 2);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs[1].state, stateNavigator.states['s1']);
                assert.ok(!stateNavigator.stateContext.crumbs[0].last);
                assert.ok(stateNavigator.stateContext.crumbs[1].last);
            });
        }
    });

    describe('Back Refresh', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(1);
                stateNavigator.refresh();
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
                link = stateNavigator.getRefreshLink();
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, null);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Back Refresh Transition With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(1);
                stateNavigator.refresh();
                stateNavigator.navigate('s3');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
                link = stateNavigator.getRefreshLink();
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s3');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s3']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 3);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs[1].state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs[2].state, stateNavigator.states['s1']);
                assert.ok(!stateNavigator.stateContext.crumbs[0].last);
                assert.ok(!stateNavigator.stateContext.crumbs[1].last);
                assert.ok(stateNavigator.stateContext.crumbs[2].last);
            });
        }
    });

    describe('Back Refresh Transition', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(1);
                stateNavigator.refresh();
                stateNavigator.navigate('s3');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
                link = stateNavigator.getRefreshLink();
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s3');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s3']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s1']);
            });
        }
    });

    describe('Transition Transition With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s1']);
            });
        }
    });

    describe('Crumb Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3', trackCrumbTrail: true },
                { key: 's4', route: 'r4', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigate('s3');
                stateNavigator.navigate('s4');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s3');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s4');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.url.match(/crumb/g).length, 4);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs[1].state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs[2].state, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.crumbs[3].state, stateNavigator.states['s3']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 4);
                assert.ok(!stateNavigator.stateContext.crumbs[0].last);
                assert.ok(!stateNavigator.stateContext.crumbs[1].last);
                assert.ok(!stateNavigator.stateContext.crumbs[2].last);
                assert.ok(stateNavigator.stateContext.crumbs[3].last);
            });
        }
    });

    describe('State State Custom Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's', route: 'r', trackCrumbTrail: true },
            ]);
            var state = stateNavigator.states['s'];
            state.truncateCrumbTrail = (state, data, crumbs) => [];
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s');
                stateNavigator.navigate('s');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate crumb trail', function() {
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Transition State State', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s1');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate crumb trail', function() {
                assert.equal(stateNavigator.stateContext.crumbs.length, 2);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs[1].state, stateNavigator.states['s1']);
            });
        }
    });

    describe('Transition State State Custom Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            var state = stateNavigator.states['s1'];
            state.truncateCrumbTrail = (state, data, crumbs) => crumbs.slice(-1);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s1');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate crumb trail', function() {
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s1']);
            });
        }
    });

    describe('State State Back', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's', route: 'r', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s');
                stateNavigator.navigate('s');
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Transition State State Back', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s1');
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
            });
        }
    });

    describe('State State Back Two', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(2);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(2);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
            });
        }
    });

    describe('State State Back Two Custom Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
            var state = stateNavigator.states['s1'];
            state.truncateCrumbTrail = (state, data, crumbs) => crumbs.slice(0, 1);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(2);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(2);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('State State Back One By One', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(1);
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
            });
        }
    });

    describe('State State Back One By One Custom Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
            var state = stateNavigator.states['s1'];
            state.truncateCrumbTrail = (state, data, crumbs) => crumbs.slice(0, 1);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(1);
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Bookmarked Link With Trail Navigate', function() {
        it ('should populate old and previous States', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigate('s2');
            stateNavigator.navigateLink(link);
            assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
            assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        })
    });

    describe('Bookmarked Link Navigate', function() {
        it ('should populate old but not previous States', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigate('s2');
            stateNavigator.navigateLink(link);
            assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
            assert.equal(stateNavigator.stateContext.previousState, null);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        })
    });

    describe('Bookmarked Link Clear Navigate', function() {
        it ('should populate previous but not old States', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigate('s2');
            stateNavigator.stateContext.clear();
            stateNavigator.navigateLink(link);
            assert.equal(stateNavigator.stateContext.oldState, undefined);
            assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        })
    });

    describe('State State Navigated', function () {
        it('should call all lifecycle functions apart from disposed', function() {
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var link = stateNavigator.getNavigationLink('s');
            stateNavigator.navigateLink(link);
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s'].validate = () => { validate = true; return true; }
            stateNavigator.states['s'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s'].dispose = () => disposed = true;
            stateNavigator.states['s'].navigating = (data, url, navigate) => {
                navigating = true;
                navigate();
            }
            stateNavigator.states['s'].navigated = () => navigated = true;
            stateNavigator.navigate('s');
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, true);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
        });
    });

    describe('State State Unloading', function () {
        it('should only call unloading function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var link = stateNavigator.getNavigationLink('s');
            stateNavigator.navigateLink(link);
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s'].validate = () => { validate = true; return true; }
            stateNavigator.states['s'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s'].dispose = () => disposed = true;
            stateNavigator.states['s'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s'].navigated = () => navigated = true;
            stateNavigator.navigate('s');
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
        });
    });

    describe('State State Navigating', function () {
        it('should only call unloading and navigating functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var link = stateNavigator.getNavigationLink('s');
            stateNavigator.navigateLink(link);
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s'].validate = () => { validate = true; return true; }
            stateNavigator.states['s'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s'].dispose = () => disposed = true;
            stateNavigator.states['s'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s'].navigated = () => navigated = true;
            stateNavigator.navigate('s');
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
        });
    });

    describe('State State Validate', function () {
        it('should only call validate function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var link = stateNavigator.getNavigationLink('s');
            stateNavigator.navigateLink(link);
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s'].validate = () => { validate = true; return false; }
            stateNavigator.states['s'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s'].dispose = () => disposed = true;
            stateNavigator.states['s'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s'].navigated = () => navigated = true;
            try {
                stateNavigator.navigate('s');
            } catch(e) {
            }
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, undefined);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
        });
    });

    describe('Transition Navigated', function () {
        it('should call all lifecycle functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' }
            ]);
            var link = stateNavigator.getNavigationLink('s0');
            stateNavigator.navigateLink(link);
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s1'].validate = () => { validate = true; return true; }
            stateNavigator.states['s0'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s0'].dispose = () => disposed = true;
            stateNavigator.states['s1'].navigating = (data, url, navigate) => {
                navigating = true;
                navigate();
            }
            stateNavigator.states['s1'].navigated = () => navigated = true;
            stateNavigator.navigate('s1');
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, true);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, true);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Transition Unloading', function () {
        it('should only call unloading function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' }
            ]);
            var link = stateNavigator.getNavigationLink('s0');
            stateNavigator.navigateLink(link);
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s1'].validate = () => { validate = true; return true; }
            stateNavigator.states['s0'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s0'].dispose = () => disposed = true;
            stateNavigator.states['s1'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s1'].navigated = () => navigated = true;
            stateNavigator.navigate('s1');
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
        });
    });

    describe('Transition Navigating', function () {
        it('should only call unloading and navigating functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' }
            ]);
            var link = stateNavigator.getNavigationLink('s0');
            stateNavigator.navigateLink(link);
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s1'].validate = () => { validate = true; return true; }
            stateNavigator.states['s0'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s0'].dispose = () => disposed = true;
            stateNavigator.states['s1'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s1'].navigated = () => navigated = true;
            stateNavigator.navigate('s1');
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
        });
    });

    describe('Transition Validate', function () {
        it('should only call validate function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' }
            ]);
            var link = stateNavigator.getNavigationLink('s0');
            stateNavigator.navigateLink(link);
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s1'].validate = () => { validate = true; return false; }
            stateNavigator.states['s0'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s0'].dispose = () => disposed = true;
            stateNavigator.states['s1'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s1'].navigated = () => navigated = true;
            try {
                stateNavigator.navigate('s1');
            } catch(e) {
            }
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, undefined);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
        });
    });

    describe('Transition Navigating Navigate', function () {
        it('should populate State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            var link = stateNavigator.getNavigationLink('s0');
            stateNavigator.navigateLink(link);
            stateNavigator.states['s1'].navigating = (data, url, navigate) => {
                stateNavigator.navigate('s2');
            }
            stateNavigator.navigate('s1');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Transition Transition Navigated', function () {
        it('should call all lifecycle functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s2'].validate = () => { validate = true; return true; }
            stateNavigator.states['s1'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s1'].dispose = () => disposed = true;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => {
                navigating = true;
                navigate();
            }
            stateNavigator.states['s2'].navigated = () => navigated = true;
            stateNavigator.navigate('s2');
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, true);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, true);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Transition Transition Unloading', function () {
        it('should only call unloading function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s2'].validate = () => { validate = true; return true; }
            stateNavigator.states['s1'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s1'].dispose = () => disposed = true;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s2'].navigated = () => navigated = true;
            stateNavigator.navigate('s2');
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Transition Transition Navigating', function () {
        it('should only call unloading and navigating functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s2'].validate = () => { validate = true; return true; }
            stateNavigator.states['s1'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s1'].dispose = () => disposed = true;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s2'].navigated = () => navigated = true;
            stateNavigator.navigate('s2');
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Transition Transition Validate', function () {
        it('should only call validate function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s2'].validate = () => { validate = true; return false; }
            stateNavigator.states['s1'].unloading = (state, data, url, unload) =>  unloading = true;
            stateNavigator.states['s1'].dispose = () => disposed = true;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s2'].navigated = () => navigated = true;
            try {
                stateNavigator.navigate('s2');
            } catch(e) {
            }
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, undefined);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Refresh Navigated', function () {
        it('should call all lifecycle functions apart from disposed', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            var link = stateNavigator.getNavigationLink('s0');
            stateNavigator.navigateLink(link);
            link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s2'].validate = () => { validate = true; return true; }
            stateNavigator.states['s2'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s2'].dispose = () => disposed = true;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => {
                navigating = true;
                navigate();
            }
            stateNavigator.states['s2'].navigated = () => navigated = true;
            stateNavigator.refresh();
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, true);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Refresh Unloading', function () {
        it('should only call unloading function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            var link = stateNavigator.getNavigationLink('s0');
            stateNavigator.navigateLink(link);
            link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s2'].validate = () => { validate = true; return true; }
            stateNavigator.states['s2'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s2'].dispose = () => disposed = true;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s2'].navigated = () => navigated = true;
            stateNavigator.refresh();
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Refresh Navigating', function () {
        it('should only call unloading and navigating functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            var link = stateNavigator.getNavigationLink('s0');
            stateNavigator.navigateLink(link);
            link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s2'].validate = () => { validate = true; return true; }
            stateNavigator.states['s2'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s2'].dispose = () => disposed = true;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s2'].navigated = () => navigated = true;
            stateNavigator.refresh();
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Refresh Validate', function () {
        it('should only call validate function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            var link = stateNavigator.getNavigationLink('s0');
            stateNavigator.navigateLink(link);
            link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s2'].validate = () => { validate = true; return false; }
            stateNavigator.states['s2'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s2'].dispose = () => disposed = true;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s2'].navigated = () => navigated = true;
            try {
                stateNavigator.refresh();
            } catch(e) {
            }
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, undefined);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Back One Navigated', function () {
        it('should call all lifecycle functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s0'].validate = () => { validate = true; return true; }
            stateNavigator.states['s1'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s1'].dispose = () => disposed = true;
            stateNavigator.states['s0'].navigating = (data, url, navigate) => {
                navigating = true;
                navigate();
            }
            stateNavigator.states['s0'].navigated = () => navigated = true;
            var link = stateNavigator.getNavigationBackLink(1);
            stateNavigator.navigateLink(link);
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, true);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, true);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
        });
    });

    describe('Back One Unloading', function () {
        it('should only call unloading function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s0'].validate = () => { validate = true; return true; }
            stateNavigator.states['s1'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s1'].dispose = () => disposed = true;
            stateNavigator.states['s0'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s0'].navigated = () => navigated = true;
            var link = stateNavigator.getNavigationBackLink(1);
            stateNavigator.navigateLink(link);
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Back One Navigating', function () {
        it('should only call unloading and navigating functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s0'].validate = () => { validate = true; return true; }
            stateNavigator.states['s1'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s1'].dispose = () => disposed = true;
            stateNavigator.states['s0'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s0'].navigated = () => navigated = true;
            var link = stateNavigator.getNavigationBackLink(1);
            stateNavigator.navigateLink(link);
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Back One Validate', function () {
        it('should only call validate function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s0'].validate = () => { validate = true; return false; }
            stateNavigator.states['s1'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s1'].dispose = () => disposed = true;
            stateNavigator.states['s0'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s0'].navigated = () => navigated = true;
            var link = stateNavigator.getNavigationBackLink(1);
            try {
                stateNavigator.navigateLink(link);
            } catch(e) {
            }
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, undefined);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Back Two Navigated', function () {
        it('should call all lifecycle functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3', trackCrumbTrail: true },
                { key: 's4', route: 'r4', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            link = stateNavigator.getNavigationLink('s3');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s4');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s2'].validate = () => { validate = true; return true; }
            stateNavigator.states['s4'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s4'].dispose = () => disposed = true;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => {
                navigating = true;
                navigate();
            }
            stateNavigator.states['s2'].navigated = () => navigated = true;
            stateNavigator.navigateBack(2);
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, true);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, true);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Back Two Unloading', function () {
        it('should only call unloading function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3', trackCrumbTrail: true },
                { key: 's4', route: 'r4', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            link = stateNavigator.getNavigationLink('s3');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s4');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s2'].validate = () => { validate = true; return true; }
            stateNavigator.states['s4'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s4'].dispose = () => disposed = true;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s2'].navigated = () => navigated = true;
            stateNavigator.navigateBack(2);
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s4']);
        });
    });

    describe('Back Two Navigating', function () {
        it('should only call unloading and navigating functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3', trackCrumbTrail: true },
                { key: 's4', route: 'r4', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            link = stateNavigator.getNavigationLink('s3');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s4');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s2'].validate = () => { validate = true; return true; }
            stateNavigator.states['s4'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s4'].dispose = () => disposed = true;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s2'].navigated = () => navigated = true;
            stateNavigator.navigateBack(2);
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s4']);
        });
    });

    describe('Back Two Validate', function () {
        it('should only call validate function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3', trackCrumbTrail: true },
                { key: 's4', route: 'r4', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            link = stateNavigator.getNavigationLink('s3');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s4');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s2'].validate = () => { validate = true; return false; }
            stateNavigator.states['s4'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s4'].dispose = () => disposed = true;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s2'].navigated = () => navigated = true;
            try{
                stateNavigator.navigateBack(2);
            } catch(e){
            }
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, undefined);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s4']);
        });
    });

    describe('Back One By One Navigated', function () {
        it('should twice call all lifecycle functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s1'].validate = () => { validate = true; return true; }
            stateNavigator.states['s2'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s2'].dispose = () => disposed = true;
            stateNavigator.states['s1'].navigating = (data, url, navigate) => {
                navigating = true;
                navigate();
            }
            stateNavigator.states['s1'].navigated = () => navigated = true;
            stateNavigator.navigateBack(1);
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, true);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, true);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
            validate = undefined;
            unloading = undefined;
            disposed = undefined;
            navigating = undefined;
            navigated = undefined;
            stateNavigator.states['s0'].validate = () => { validate = true; return true; }
            stateNavigator.states['s1'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s1'].dispose = () => disposed = true;
            stateNavigator.states['s0'].navigating = (data, url, navigate) => {
                navigating = true;
                navigate();
            }
            stateNavigator.states['s0'].navigated = () => navigated = true;
            var link = stateNavigator.getNavigationBackLink(1);
            stateNavigator.navigateLink(link);
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, true);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, true);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
        });
    });

    describe('Back One By One Unloading', function () {
        it('should twice only call unloading function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s1'].validate = () => { validate = true; return true; }
            stateNavigator.states['s2'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s2'].dispose = () => disposed = true;
            stateNavigator.states['s1'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s1'].navigated = () => navigated = true;
            stateNavigator.navigateBack(1);
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
            validate = undefined;
            unloading = undefined;
            disposed = undefined;
            navigating = undefined;
            navigated = undefined;
            var link = stateNavigator.getNavigationBackLink(1);
            stateNavigator.navigateLink(link);
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Back One By One Navigating', function () {
        it('should twice only call unloading and navigating functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s1'].validate = () => { validate = true; return true; }
            stateNavigator.states['s2'].unloading = (state, data, url, unload) => {
                unloading = true;
                unload();
            }
            stateNavigator.states['s2'].dispose = () => disposed = true;
            stateNavigator.states['s1'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s1'].navigated = () => navigated = true;
            stateNavigator.navigateBack(1);
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
            validate = undefined;
            unloading = undefined;
            disposed = undefined;
            navigating = undefined;
            navigated = undefined;
            var link = stateNavigator.getNavigationBackLink(1);
            stateNavigator.navigateLink(link);
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, true);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Back One By One Valiate', function () {
        it('should twice only call validate function', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            var validate, unloading, disposed, navigating, navigated;
            stateNavigator.states['s1'].validate = () => { validate = true; return false; }
            stateNavigator.states['s2'].unloading = (state, data, url, unload) => unloading = true;
            stateNavigator.states['s2'].dispose = () => disposed = true;
            stateNavigator.states['s1'].navigating = (data, url, navigate) => navigating = true;
            stateNavigator.states['s1'].navigated = () => navigated = true;
            try{
                stateNavigator.navigateBack(1);
            } catch(e) {
            }
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, undefined);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
            validate = undefined;
            unloading = undefined;
            disposed = undefined;
            navigating = undefined;
            navigated = undefined;
            var link = stateNavigator.getNavigationBackLink(1);
            try {
                stateNavigator.navigateLink(link);
            } catch(e) {
            }
            assert.strictEqual(validate, true);
            assert.strictEqual(unloading, undefined);
            assert.strictEqual(disposed, undefined);
            assert.strictEqual(navigating, undefined);
            assert.strictEqual(navigated, undefined);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Unloading Navigate', function () {
        it('should go to to State instead of initial State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3' }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigate('s1');
            stateNavigator.navigate('s2');
            var disposed = 0, unloading, navigated10, navigated01;
            stateNavigator.states['s2'].unloading = (state, data, url, unload) => {
                if (!unloading) {
                    unloading = true;
                    stateNavigator.navigateLink(link);
                } else {
                    unload();
                }
            }
            stateNavigator.states['s2'].dispose = () => disposed++;
            stateNavigator.states['s3'].navigated = () => navigated10 = true;
            stateNavigator.states['s1'].navigated = () => navigated01 = true;
            stateNavigator.navigate('s3');
            assert.strictEqual(disposed, 1);
            assert.strictEqual(unloading, true);
            assert.strictEqual(navigated10, undefined);
            assert.strictEqual(navigated01, true);
            assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
            assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Navigating Navigate', function () {
        it('should go to to State instead of initial State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3' }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigate('s1');
            stateNavigator.navigate('s2');
            var disposed = 0, navigating, navigated10, navigated01;
            stateNavigator.states['s2'].dispose = () => disposed++;
            stateNavigator.states['s3'].navigating = (data, url, navigate) => {
                navigating = true;
                stateNavigator.navigateLink(link);
            }
            stateNavigator.states['s3'].navigated = () => navigated10 = true;
            stateNavigator.states['s1'].navigated = () => navigated01 = true;
            stateNavigator.navigate('s3');
            assert.strictEqual(disposed, 1);
            assert.strictEqual(navigating, true);
            assert.strictEqual(navigated10, undefined);
            assert.strictEqual(navigated01, true);
            assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
            assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('On Navigate', function () {
        it('should call onNavigate listener', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            var oldStates = [];
            var states = [];
            stateNavigator.navigate('s0');
            var navigatedHandler = (oldState, state, data) => {
                oldStates.push(oldState);
                states.push(state);
            };
            stateNavigator.onNavigate(navigatedHandler);
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            stateNavigator.offNavigate(navigatedHandler);
            assert.equal(oldStates[0], stateNavigator.states['s0']);
            assert.equal(states[0], stateNavigator.states['s1']);
            assert.equal(oldStates[1], stateNavigator.states['s1']);
            assert.equal(states[1], stateNavigator.states['s2']);
            assert.equal(oldStates.length, 2);
            assert.equal(states.length, 2);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Duplicate On Navigate', function () {
        it('should throw error', function() {
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var oldStates = [];
            var states = [];
            stateNavigator.navigate('s');
            var navigatedHandler = (oldState, state, data) => {
                oldStates.push(oldState);
                states.push(state);
            };
            stateNavigator.onNavigate(navigatedHandler);
            assert.throws(() => stateNavigator.onNavigate(navigatedHandler));
        });
    });

    describe('Duplicate On Off Navigate', function () {
        it('should call onNavigate listener', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            var oldStates = [];
            var states = [];
            stateNavigator.navigate('s0');
            var navigatedHandler = (oldState, state, data) => {
                oldStates.push(oldState);
                states.push(state);
            };
            stateNavigator.onNavigate(navigatedHandler);
            stateNavigator.offNavigate(navigatedHandler);
            stateNavigator.onNavigate(navigatedHandler);
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            stateNavigator.offNavigate(navigatedHandler);
            assert.equal(oldStates[0], stateNavigator.states['s0']);
            assert.equal(states[0], stateNavigator.states['s1']);
            assert.equal(oldStates[1], stateNavigator.states['s1']);
            assert.equal(states[1], stateNavigator.states['s2']);
            assert.equal(oldStates.length, 2);
            assert.equal(states.length, 2);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Copy On Navigate', function () {
        it('should call both onNavigate listeners', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            var oldStates = [];
            var states = [];
            stateNavigator.navigate('s0');
            var navigatedHandler1 = (oldState, state, data) => {
                oldStates.push(oldState);
                states.push(state);
            };
            var navigatedHandler2 = (oldState, state, data) => {
                oldStates.push(oldState);
                states.push(state);
            };
            stateNavigator.onNavigate(navigatedHandler1);
            stateNavigator.onNavigate(navigatedHandler2);
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            stateNavigator.offNavigate(navigatedHandler1);
            stateNavigator.offNavigate(navigatedHandler2);
            assert.equal(oldStates[0], stateNavigator.states['s0']);
            assert.equal(states[0], stateNavigator.states['s1']);
            assert.equal(oldStates[1], stateNavigator.states['s0']);
            assert.equal(states[1], stateNavigator.states['s1']);
            assert.equal(oldStates[2], stateNavigator.states['s1']);
            assert.equal(states[2], stateNavigator.states['s2']);
            assert.equal(oldStates[3], stateNavigator.states['s1']);
            assert.equal(states[3], stateNavigator.states['s2']);
            assert.equal(oldStates.length, 4);
            assert.equal(states.length, 4);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Multiple On Navigate', function () {
        it('should call multiple onNavigate listeners', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            var oldStates1 = [];
            var states1 = [];
            var oldStates2 = [];
            var states2 = [];
            stateNavigator.navigate('s0');
            var navigatedHandler1 = (oldState, state, data) => {
                oldStates1.push(oldState);
                states1.push(state);
            };
            var navigatedHandler2 = (oldState, state, data) => {
                oldStates2.push(oldState);
                states2.push(state);
            };
            stateNavigator.onNavigate(navigatedHandler1);
            stateNavigator.onNavigate(navigatedHandler2);
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.navigate('s2');
            stateNavigator.offNavigate(navigatedHandler1);
            stateNavigator.offNavigate(navigatedHandler2);
            assert.equal(oldStates1[0], stateNavigator.states['s0']);
            assert.equal(states1[0], stateNavigator.states['s1']);
            assert.equal(oldStates2[0], stateNavigator.states['s0']);
            assert.equal(states2[0], stateNavigator.states['s1']);
            assert.equal(oldStates1[1], stateNavigator.states['s1']);
            assert.equal(states1[1], stateNavigator.states['s2']);
            assert.equal(oldStates2[1], stateNavigator.states['s1']);
            assert.equal(states2[1], stateNavigator.states['s2']);
            assert.equal(oldStates1.length, 2);
            assert.equal(states1.length, 2);
            assert.equal(oldStates2.length, 2);
            assert.equal(states2.length, 2);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Off Navigate', function () {
        it('should stop calling onNavigate listener', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            var oldStates = [];
            var states = [];
            stateNavigator.navigate('s0');
            var navigatedHandler = (oldState, state, data) => {
                oldStates.push(oldState);
                states.push(state);
            };
            stateNavigator.onNavigate(navigatedHandler);
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.offNavigate(navigatedHandler);
            stateNavigator.offNavigate(navigatedHandler);
            stateNavigator.navigate('s2');
            assert.equal(oldStates[0], stateNavigator.states['s0']);
            assert.equal(states[0], stateNavigator.states['s1']);
            assert.equal(oldStates.length, 1);
            assert.equal(states.length, 1);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Multiple Off Navigate', function () {
        it('should individually stop calling onNavigate listeners', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            var oldStates1 = [];
            var states1 = [];
            var oldStates2 = [];
            var states2 = [];
            stateNavigator.navigate('s0');
            var navigatedHandler1 = (oldState, state, data) => {
                oldStates1.push(oldState);
                states1.push(state);
            };
            var navigatedHandler2 = (oldState, state, data) => {
                oldStates2.push(oldState);
                states2.push(state);
            };
            stateNavigator.onNavigate(navigatedHandler1);
            stateNavigator.onNavigate(navigatedHandler2);
            var link = stateNavigator.getNavigationLink('s1');
            stateNavigator.navigateLink(link);
            stateNavigator.offNavigate(navigatedHandler1);
            stateNavigator.navigate('s2');
            stateNavigator.offNavigate(navigatedHandler2);
            assert.equal(oldStates1[0], stateNavigator.states['s0']);
            assert.equal(states1[0], stateNavigator.states['s1']);
            assert.equal(oldStates2[0], stateNavigator.states['s0']);
            assert.equal(states2[0], stateNavigator.states['s1']);
            assert.equal(oldStates2[1], stateNavigator.states['s1']);
            assert.equal(states2[1], stateNavigator.states['s2']);
            assert.equal(oldStates1.length, 1);
            assert.equal(states1.length, 1);
            assert.equal(oldStates2.length, 2);
            assert.equal(states2.length, 2);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Unloading Navigate And Continue', function () {
        it('should go to to State instead of initial State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3' }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            stateNavigator.states['s1'].unloading = (state, data, url, unload) => {
                if (data.x)
                    stateNavigator.navigate('s2');
                unload();
            }
            var navigating;
            stateNavigator.states['s3'].navigating = (data, url, navigate) => {
                navigating = true;
                navigate();
            }
            stateNavigator.navigate('s3', { x: true });
            assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
            assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s1']);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
            assert.strictEqual(navigating, undefined);
        });
    });

    describe('Unloading Navigate Url And Continue', function () {
        it('should go to State once', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2' }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            var unloading;
            stateNavigator.states['s1'].unloading = (state, data, url, unload) => {
                if (!unloading) {
                    unloading = true;
                    stateNavigator.navigateLink(url);
                }
                unload();
            }
            var navigating = 0;
            stateNavigator.states['s2'].navigating = (data, url, navigate) => {
                navigating++;
                navigate();
            }
            stateNavigator.navigate('s2');
            assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
            assert.equal(stateNavigator.stateContext.previousState, null);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
            assert.strictEqual(navigating, 1);
        });
    });

    describe('Navigating Navigate And Continue', function () {
        it('should go to to State instead of initial State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0'},
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true},
                { key: 's3', route: 'r3' }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            stateNavigator.states['s3'].navigating = (data, url, navigate) => {
                stateNavigator.navigate('s2');
                navigate();
            }
            stateNavigator.navigate('s3');
            assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
            assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s1']);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s2']);
        });
    });

    describe('Navigated Navigate On Navigate', function () {
        it('should call onNavigate listener once', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2' },
                { key: 's3', route: 'r3', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            stateNavigator.states['s2'].navigated = () => {
                stateNavigator.navigate('s3');
            }
            var navigatedState;
            var hits = 0;
            var navigatedHandler = (oldState, state, data) => {
                navigatedState = state;
                hits++;
            };
            stateNavigator.onNavigate(navigatedHandler);
            stateNavigator.navigate('s2');
            stateNavigator.offNavigate(navigatedHandler);
            assert.equal(hits, 1);
            assert.equal(navigatedState, stateNavigator.stateContext.state);
            assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
            assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s2']);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s3']);
        });
    });

    describe('State Params Navigated', function () {
        it('should pass State and Data but no old State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var navigatedOldState, navigatedState, navigatedData, navigatedAsyncData, navigatingData, navigatingUrl;
            stateNavigator.states['s'].navigating = (data, url, navigating) => {
                navigatingData = data;
                navigatingUrl = url;
                navigating('World');
            }
            var navigatedHandler = (oldState, state, data, asyncData) => {
                navigatedOldState = oldState;
                navigatedState = state;
                navigatedData = data;
                navigatedAsyncData = asyncData;
            };
            stateNavigator.onNavigate(navigatedHandler);
            var url = stateNavigator.getNavigationLink('s', { s: 'Hello' });
            stateNavigator.navigate('s', { s: 'Hello' });
            stateNavigator.offNavigate(navigatedHandler);
            assert.strictEqual(navigatingData.s, 'Hello');
            assert.strictEqual(navigatingUrl, url);
            assert.strictEqual(navigatedOldState, null);
            assert.strictEqual(navigatedState, stateNavigator.states['s']);
            assert.strictEqual(navigatedData.s, 'Hello');
            assert.strictEqual(navigatedAsyncData, 'World');
            assert.strictEqual(stateNavigator.stateContext.data.s, 'Hello');
        });
    });

    describe('Transition Params Navigated', function () {
        it('should pass old State, State and Data', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' }
            ]);
            var link = stateNavigator.getNavigationLink('s0');
            stateNavigator.navigateLink(link);
            var unloadingState, unloadingUrl, navigatedOldState, navigatedState, navigatedData, navigatedAsyncData, navigatingData, navigatingUrl;
            stateNavigator.states['s0'].unloading = (state, data, url, unload) => {
                unloadingState = state;
                unloadingUrl = url;
                unload();
            }
            stateNavigator.states['s1'].navigating = (data, url, navigating) => {
                navigatingData = data;
                navigatingUrl = url;
                navigating('World');
            }
            var navigatedHandler = (oldState, state, data, asyncData) => {
                navigatedOldState = oldState;
                navigatedState = state;
                navigatedData = data;
                navigatedAsyncData = asyncData;
            };
            stateNavigator.onNavigate(navigatedHandler);
            var url = stateNavigator.getNavigationLink('s1', { s: 'Hello' });
            stateNavigator.navigate('s1', { s: 'Hello' });
            stateNavigator.offNavigate(navigatedHandler);
            assert.strictEqual(unloadingState, stateNavigator.states['s1']);
            assert.strictEqual(unloadingUrl, url);
            assert.strictEqual(navigatingData.s, 'Hello');
            assert.strictEqual(navigatingUrl, url);
            assert.strictEqual(navigatedOldState, stateNavigator.states['s0']);
            assert.strictEqual(navigatedState, stateNavigator.states['s1']);
            assert.strictEqual(navigatedData.s, 'Hello');
            assert.strictEqual(navigatedAsyncData, 'World');
        });
    });

    describe('Navigating Navigate Params Navigated', function () {
        it('should pass State and Data', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' }
            ]);
            var navigatedOldState, navigatedState, navigatedData, navigatedAsyncData;
            stateNavigator.states['s0'].navigating = (data, url, navigating) => {
                stateNavigator.navigate('s1', { s: 'Hello' });
                navigating();
            }
            stateNavigator.states['s1'].navigating = (data, url, navigating) => {
                navigating('World');
            }
            var navigatedHandler = (oldState, state, data, asyncData) => {
                stateNavigator.offNavigate(navigatedHandler);
                navigatedOldState = oldState;
                navigatedState = state;
                navigatedData = data;
                navigatedAsyncData = asyncData;
            };
            stateNavigator.onNavigate(navigatedHandler);
            stateNavigator.navigate('s0');
            assert.equal(navigatedOldState, null);
            assert.strictEqual(navigatedState, stateNavigator.states['s1']);
            assert.strictEqual(navigatedData.s, 'Hello');
            assert.strictEqual(navigatedAsyncData, 'World');
        });
    });

    describe('History Navigate', function () {
        it('should pass history flag to lifecycle functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            var unloadingHistory, navigatingHistory;
            stateNavigator.states['s0'].unloading = (state, data, url, unload, history) => {
                unloadingHistory = history; 
                unload();
            }
            stateNavigator.states['s1'].navigating = (data, url, navigate, history) => {
                navigatingHistory = history;
                navigate();
            }
            stateNavigator.navigateLink(link, undefined, true);
            assert.strictEqual(unloadingHistory, true);
            assert.strictEqual(navigatingHistory, true);
        });
    });

    describe('Non History Navigate', function () {
        it('should not pass history flag to lifecycle functions', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0'},
                { key: 's1', route: 'r1' }
            ]);
            stateNavigator.navigate('s0');
            var link = stateNavigator.getNavigationLink('s1');
            var unloadingHistory, navigatingHistory;
            stateNavigator.states['s0'].unloading = (state, data, url, unload, history) => {
                unloadingHistory = history; 
                unload();
            }
            stateNavigator.states['s1'].navigating = (data, url, navigate, history) => {
                navigatingHistory = history;
                navigate();
            }
            stateNavigator.navigateLink(link);
            assert.strictEqual(unloadingHistory, false);
            assert.strictEqual(navigatingHistory, false);
        });
    });

    describe('Async Data Navigating', function () {
        it('should pass async data to navigated function', function(done: MochaDone) {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0'},
                { key: 's1', route: 'r1' }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.states['s1'].navigated = (data, asyncData) => {
                assert.equal(asyncData, 'hello');
                done();
            }
            stateNavigator.states['s1'].navigating = (data, url, navigate) => {
                setTimeout(() => navigate('hello'), 0);
            }
            stateNavigator.navigate('s1');
        });
    });

    describe('Async Data Navigating Navigating', function () {
        it('should pass async data to navigated function once', function(done: MochaDone) {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.states['s1'].navigated = (data, asyncData) => {
                assert.equal(asyncData, 0);
            }
            var i = 0;
            stateNavigator.states['s1'].navigating = (data, url, navigate) => {
                ((count) => setTimeout(() => {
                    navigate(count);
                    if (count === 1)
                        done();
                }, 0))(i);
                i++;
            }
            stateNavigator.navigate('s1');
            stateNavigator.navigate('s1');
        });
    });

    describe('Reversed Async Data Navigating Navigating', function () {
        it('should pass second async data to navigated function', function(done: MochaDone) {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0'},
                { key: 's1', route: 'r1' }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.states['s1'].navigated = (data, asyncData) => {
                assert.equal(asyncData, 1);
            }
            var i = 0;
            stateNavigator.states['s1'].navigating = (data, url, navigate) => {
                ((count) => setTimeout(() => { 
                    navigate(count);
                    if (count === 0)
                        done();
                }, 5 - 5 * count))(i);
                i++;
            }
            stateNavigator.navigate('s1');
            stateNavigator.navigate('s1');
        });
    });

    describe('No Async Data Navigating', function () {
        it('should not pass any async data', function(done: MochaDone) {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' },
                { key: 's2', route: 'r2' }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.states['s1'].navigated = (data, asyncData) => {
                stateNavigator.navigate('s2');
            }
            stateNavigator.states['s2'].navigated = (data, asyncData) => {
                assert.equal(asyncData, undefined);
                done();
            }
            stateNavigator.states['s1'].navigating = (data, url, navigate) => {
                setTimeout(() => navigate('hello'), 0);
            }
            stateNavigator.navigate('s1');
        });
    });

    describe('Route Navigate', function () {
        it('should go to State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 's' },
                { key: 's1', route: 'abc/{x}' }
            ]);
            stateNavigator.navigateLink('/abc/de');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
            stateNavigator.navigateLink('/s');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
        });
    });

    describe('Route Root Navigate', function () {
        it('should go to State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: '{y}' },
                { key: 's1', route: 's' }
            ]);
            stateNavigator.states['s0'].validate = (data) => data.y !== 's'; 
            stateNavigator.navigateLink('/sa');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
            stateNavigator.navigateLink('/s');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Route Root Order Navigate', function () {
        it('should go to State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's1', route: 's' },
                { key: 's0', route: '{y}' }
            ]);
            stateNavigator.navigateLink('/sa');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
            stateNavigator.navigateLink('/s');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Two Route Navigate', function () {
        it('should go to State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 's' },
                { key: 's1', route: ['abc/{x}', 'def/{y}'] }
            ]);
            stateNavigator.navigateLink('/abc/de');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
            stateNavigator.navigateLink('/def/gh');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
            stateNavigator.navigateLink('/s');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
        });
    });

    describe('Expand Route Navigate', function () {
        it('should go to State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 's' },
                { key: 's1', route: 'abc/{x}+/def/{y}' }
            ]);
            stateNavigator.navigateLink('/abc/de');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
            stateNavigator.navigateLink('abc/de/def/gh');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
            stateNavigator.navigateLink('/s');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
        });
    });
    
    describe('Two Route Root Navigate', function () {
        it('should go to State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: ['abc/{x}', '{y}'] },
                { key: 's1', route: 's' }
            ]);
            stateNavigator.states['s0'].validate = (data) => data.y !== 's'; 
            stateNavigator.navigateLink('/abc/de');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
            stateNavigator.navigateLink('/sa');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
            stateNavigator.navigateLink('/s');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });
    
    describe('Two Route Root Order Navigate', function () {
        it('should go to State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's1', route: 's' },
                { key: 's0', route: ['abc/{x}', '{y}'] }
            ]);
            stateNavigator.navigateLink('/abc/de');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
            stateNavigator.navigateLink('/sa');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
            stateNavigator.navigateLink('/s');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Expand Route Root Navigate', function () {
        it('should go to State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: '+abc/{x}' },
                { key: 's1', route: 's' }
            ]);
            stateNavigator.navigateLink('/abc/de');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
            stateNavigator.navigateLink('/');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
            stateNavigator.navigateLink('/s');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Expand And Two Route Navigate', function () {
        it('should go to State', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 's' },
                { key: 's1', route: ['abc/{x}+/def/{y}', 'ghi/{y}'] }
            ]);
            stateNavigator.navigateLink('/abc/de');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
            stateNavigator.navigateLink('abc/de/def/gh');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
            stateNavigator.navigateLink('/ghi/jk');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
            stateNavigator.navigateLink('/s');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
        });
    });

    describe('Clear State Context', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s');
                stateNavigator.refresh();
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getRefreshLink();
                stateNavigator.navigateLink(link);
            });            
            test();
        });
        
        function test(){
            it('should clear State context', function() {
                stateNavigator.stateContext.clear();
                assert.strictEqual(stateNavigator.stateContext.oldState, null);
                assert.strictEqual(stateNavigator.stateContext.previousState, null);
                assert.strictEqual(stateNavigator.stateContext.state, null);
                assert.strictEqual(stateNavigator.stateContext.url, null);
                assert.strictEqual(stateNavigator.stateContext.title, null);
                assert.strictEqual(stateNavigator.stateContext.crumbs.length, 0);
                assert.strictEqual(stateNavigator.stateContext.nextCrumb, null);
            });
        }
    });

    describe('History Null', function () {
        var replaceHistory;
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            var historyManager = new HashHistoryManager();
            replaceHistory = undefined;
            historyManager.addHistory = (url: string, replace: boolean) => {
                replaceHistory = replace;
            }
            stateNavigator = new StateNavigator([
                    { key: 's', route: 'r' }
                ],
                historyManager
            );
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s');
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should pass replace false to history manager', function() {
                assert.strictEqual(replaceHistory, false);
            });
        }
    });

    describe('History Add', function () {
        var replaceHistory;
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            var historyManager = new HashHistoryManager();
            replaceHistory = undefined;
            historyManager.addHistory = (url: string, replace: boolean) => {
                replaceHistory = replace;
            }
            stateNavigator = new StateNavigator([
                    { key: 's', route: 'r' }
                ],
                historyManager
            );
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s', null, 'add');
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link, 'add');
            });
            test();
        });
        
        function test() {
            it('should pass replace false to history manager', function() {
                assert.strictEqual(replaceHistory, false);
            });
        }
    });

    describe('History Replace', function () {
        var replaceHistory;
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            var historyManager = new HashHistoryManager();
            replaceHistory = undefined;
            historyManager.addHistory = (url: string, replace: boolean) => {
                replaceHistory = replace;
            }
            stateNavigator = new StateNavigator([
                    { key: 's', route: 'r' }
                ],
                historyManager
            );
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s', null, 'replace');
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link, 'replace');
            });
            test();
        });
        
        function test() {
            it('should pass replace true to history manager', function() {
                assert.strictEqual(replaceHistory, true);
            });
        }
    });

    describe('History None', function () {
        var replaceHistory;
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            var historyManager = new HashHistoryManager();
            replaceHistory = undefined;
            historyManager.addHistory = (url: string, replace: boolean) => {
                replaceHistory = replace;
            }
            stateNavigator = new StateNavigator([
                    { key: 's', route: 'r' }
                ],
                historyManager
            );
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s', null, 'none');
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link, 'none');
            });
            test();
        });
        
        function test() {
            it('should not call history manager', function() {
                assert.strictEqual(replaceHistory, undefined);
            });
        }
    });

    describe('History Null Refresh Navigate', function () {
        it('should pass replace false to history manager', function() {
            var dialogs = [
                { key: 's', route: 'r' }
            ];
            var stateNavigator = new StateNavigator(dialogs);
            stateNavigator.navigate('s');
            var historyManager = new HashHistoryManager();
            var replaceHistory = undefined;
            historyManager.addHistory = (url: string, replace: boolean) => {
                replaceHistory = replace;
            }
            stateNavigator.configure(dialogs, historyManager);
            stateNavigator.refresh();
            assert.strictEqual(replaceHistory, false);
        });
    });

    describe('History Add Refresh Navigate', function () {
        it('should pass replace false to history manager', function() {
            var dialogs = [
                { key: 's', route: 'r' }
            ];
            var stateNavigator = new StateNavigator(dialogs);
            stateNavigator.navigate('s');
            var historyManager = new HashHistoryManager();
            var replaceHistory = undefined;
            historyManager.addHistory = (url: string, replace: boolean) => {
                replaceHistory = replace;
            }
            stateNavigator.configure(dialogs, historyManager);
            stateNavigator.refresh(null, 'add');
            assert.strictEqual(replaceHistory, false);
        });
    });

    describe('History Replace Refresh Navigate', function () {
        it('should pass replace true to history manager', function() {
            var dialogs = [
                { key: 's', route: 'r' }
            ];
            var stateNavigator = new StateNavigator(dialogs);
            stateNavigator.navigate('s');
            var historyManager = new HashHistoryManager();
            var replaceHistory = undefined;
            historyManager.addHistory = (url: string, replace: boolean) => {
                replaceHistory = replace;
            }
            stateNavigator.configure(dialogs, historyManager);
            stateNavigator.refresh(null, 'replace');
            assert.strictEqual(replaceHistory, true);
        });
    });

    describe('History None Refresh Navigate', function () {
        it('should not call history manager', function() {
            var dialogs = [
                { key: 's', route: 'r' }
            ];
            var stateNavigator = new StateNavigator(dialogs);
            stateNavigator.navigate('s');
            var historyManager = new HashHistoryManager();
            var replaceHistory = undefined;
            historyManager.addHistory = (url: string, replace: boolean) => {
                replaceHistory = replace;
            }
            stateNavigator.configure(dialogs, historyManager);
            stateNavigator.refresh(null, 'none');
            assert.strictEqual(replaceHistory, undefined);
        });
    });

    describe('History Null Back Navigate', function () {
        it('should pass replace false to history manager', function() {
            var dialogs = [
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ];
            var stateNavigator = new StateNavigator(dialogs);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            var historyManager = new HashHistoryManager();
            var replaceHistory = undefined;
            historyManager.addHistory = (url: string, replace: boolean) => {
                replaceHistory = replace;
            }
            stateNavigator.configure(dialogs, historyManager);
            stateNavigator.navigateBack(1);
            assert.strictEqual(replaceHistory, false);
        });
    });

    describe('History Add Back Navigate', function () {
        it('should pass replace false to history manager', function() {
            var dialogs = [
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ];
            var stateNavigator = new StateNavigator(dialogs);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            var historyManager = new HashHistoryManager();
            var replaceHistory = undefined;
            historyManager.addHistory = (url: string, replace: boolean) => {
                replaceHistory = replace;
            }
            stateNavigator.configure(dialogs, historyManager);
            stateNavigator.navigateBack(1, 'add');
            assert.strictEqual(replaceHistory, false);
        });
    });

    describe('History Replace Back Navigate', function () {
        it('should pass replace true to history manager', function() {
            var dialogs = [
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]
            var stateNavigator = new StateNavigator(dialogs);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            var historyManager = new HashHistoryManager();
            var replaceHistory = undefined;
            historyManager.addHistory = (url: string, replace: boolean) => {
                replaceHistory = replace;
            }
            stateNavigator.configure(dialogs, historyManager);
            stateNavigator.navigateBack(1, 'replace');
            assert.strictEqual(replaceHistory, true);
        });
    });

    describe('History None Back Navigate', function () {
        it('should not call history manager', function() {
            var dialogs = [
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ];
            var stateNavigator = new StateNavigator(dialogs);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            var historyManager = new HashHistoryManager();
            var replaceHistory = undefined;
            historyManager.addHistory = (url: string, replace: boolean) => {
                replaceHistory = replace;
            }
            stateNavigator.configure(dialogs, historyManager);
            stateNavigator.navigateBack(1, 'none');
            assert.strictEqual(replaceHistory, undefined);
        });
    });

    describe('History Navigated Navigate', function () {
        it('should not call history manager', function() {
            var called = false;
            var historyManager = new HashHistoryManager();
            historyManager.addHistory = (url: string, replace: boolean) => {
                called = true;
            }
            var stateNavigator = new StateNavigator([
                    { key: 's0', route: 'r0' },
                    { key: 's1', route: 'r1' }
                ],
                historyManager
            );
            stateNavigator.states['s0'].navigated = () => {
                stateNavigator.navigate('s1', null, 'none');
            }
            stateNavigator.navigate('s0');
            assert.ok(!called);
        });
    });

    describe('Reload Dialog', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r' }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.configure([
                { key: 's1', route: 'r' }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s1');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
            });            
            test();
        });
        
        function test(){
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Reload Transition', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r' }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.stateContext.clear();
            stateNavigator.configure([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {            
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
            });
        }
    });
    
    describe('Reload Refresh', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r' }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.stateContext.clear();
            stateNavigator.configure([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.refresh();
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getRefreshLink();
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {            
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 2);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs[1].state, stateNavigator.states['s1']);
                assert.ok(!stateNavigator.stateContext.crumbs[0].last);
                assert.ok(stateNavigator.stateContext.crumbs[1].last);
            });
        }
    });
    
    describe('Reload Back', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r' }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.stateContext.clear();
            stateNavigator.configure([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
            });
        }
    });
    
    describe('Reload Error State', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            try {
                stateNavigator.configure([<any>
                    { key: '' }
                ]);
            } catch(e) {
            }
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s');
                stateNavigator.navigateLink(link);
            });            
            test();
        });
        
        function test(){
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Reload Error Transition', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            try {
                stateNavigator.configure([<any>
                    { key: '' }
                ]);
            } catch(e) {
            }
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {            
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
            });
        }
    });
    
    describe('Reload Error Refresh', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            try {
                stateNavigator.configure([<any>
                    { key: '' }
                ]);
            } catch(e) {
            }
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.refresh();
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getRefreshLink();
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {            
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 2);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs[1].state, stateNavigator.states['s1']);
                assert.ok(!stateNavigator.stateContext.crumbs[0].last);
                assert.ok(stateNavigator.stateContext.crumbs[1].last);
            });
        }
    });
    
    describe('Reload Error Back', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
            try {
                stateNavigator.configure([<any>
                    { key: '' }
                ]);
            } catch(e) {
            }
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
            });
        }
    });

    describe('Two Controllers Dialog', function() {
        var stateNavigator0: StateNavigator;
        var stateNavigator1: StateNavigator;
        beforeEach(function() {
            stateNavigator0 = new StateNavigator([
                { key: 's0', route: 'r' }
            ]);
            stateNavigator1 = new StateNavigator([
                { key: 's1', route: 'r' }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator0.navigate('s0');
                stateNavigator1.navigate('s1');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator0.getNavigationLink('s0');
                stateNavigator0.navigateLink(link);
                link = stateNavigator1.getNavigationLink('s1');
                stateNavigator1.navigateLink(link);
            });            
            test();
        });
        
        function test(){
            it('should populate context', function() {
                assert.equal(stateNavigator0.stateContext.state, stateNavigator0.states['s0']);
                assert.equal(stateNavigator1.stateContext.state, stateNavigator1.states['s1']);
                assert.equal(stateNavigator0.stateContext.crumbs.length, 0);
                assert.equal(stateNavigator1.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Two Controllers Transition', function() {
        var stateNavigator0: StateNavigator;
        var stateNavigator1: StateNavigator;
        beforeEach(function() {
            stateNavigator0 = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            stateNavigator1 = new StateNavigator([
                { key: 's2', route: 'r0' },
                { key: 's3', route: 'r1', trackCrumbTrail: true }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator0.navigate('s0');
                stateNavigator1.navigate('s2');
                stateNavigator0.navigate('s1');
                stateNavigator1.navigate('s3');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator0.getNavigationLink('s0');
                stateNavigator0.navigateLink(link);
                link = stateNavigator1.getNavigationLink('s2');
                stateNavigator1.navigateLink(link);
                link = stateNavigator0.getNavigationLink('s1');
                stateNavigator0.navigateLink(link);
                link = stateNavigator1.getNavigationLink('s3');
                stateNavigator1.navigateLink(link);
            });
            test();
        });
        
        function test() {            
            it('should populate context', function() {
                assert.equal(stateNavigator0.stateContext.state, stateNavigator0.states['s1']);
                assert.equal(stateNavigator1.stateContext.state, stateNavigator1.states['s3']);
                assert.equal(stateNavigator0.stateContext.oldState, stateNavigator0.states['s0']);
                assert.equal(stateNavigator1.stateContext.oldState, stateNavigator1.states['s2']);
                assert.equal(stateNavigator0.stateContext.previousState, stateNavigator0.states['s0']);
                assert.equal(stateNavigator1.stateContext.previousState, stateNavigator1.states['s2']);
                assert.equal(stateNavigator0.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator0.stateContext.crumbs[0].state, stateNavigator0.states['s0']);
                assert.ok(stateNavigator0.stateContext.crumbs[0].last);
                assert.equal(stateNavigator1.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator1.stateContext.crumbs[0].state, stateNavigator1.states['s2']);
                assert.ok(stateNavigator1.stateContext.crumbs[0].last);
            });
        }
    });
    
    describe('Two Controllers Refresh', function() {
        var stateNavigator0: StateNavigator;
        var stateNavigator1: StateNavigator;
        beforeEach(function() {
            stateNavigator0 = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            stateNavigator1 = new StateNavigator([
                { key: 's2', route: 'r0' },
                { key: 's3', route: 'r1', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator0.navigate('s0');
                stateNavigator1.navigate('s2');
                stateNavigator0.navigate('s1');
                stateNavigator1.navigate('s3');
                stateNavigator0.refresh();
                stateNavigator1.refresh();
            });
            test();
        });

        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator0.getNavigationLink('s0');
                stateNavigator0.navigateLink(link);
                link = stateNavigator1.getNavigationLink('s2');
                stateNavigator1.navigateLink(link);
                link = stateNavigator0.getNavigationLink('s1');
                stateNavigator0.navigateLink(link);
                link = stateNavigator1.getNavigationLink('s3');
                stateNavigator1.navigateLink(link);
                link = stateNavigator0.getRefreshLink();
                stateNavigator0.navigateLink(link);
                link = stateNavigator1.getRefreshLink();
                stateNavigator1.navigateLink(link);
            });
            test();
        });
        
        function test() {            
            it('should populate context', function() {
                assert.equal(stateNavigator0.stateContext.state, stateNavigator0.states['s1']);
                assert.equal(stateNavigator1.stateContext.state, stateNavigator1.states['s3']);
                assert.equal(stateNavigator0.stateContext.oldState, stateNavigator0.states['s1']);
                assert.equal(stateNavigator1.stateContext.oldState, stateNavigator1.states['s3']);
                assert.equal(stateNavigator0.stateContext.previousState, stateNavigator0.states['s1']);
                assert.equal(stateNavigator1.stateContext.previousState, stateNavigator1.states['s3']);
                assert.equal(stateNavigator0.stateContext.crumbs.length, 2);
                assert.equal(stateNavigator0.stateContext.crumbs[0].state, stateNavigator0.states['s0']);
                assert.equal(stateNavigator0.stateContext.crumbs[1].state, stateNavigator0.states['s1']);
                assert.ok(!stateNavigator0.stateContext.crumbs[0].last);
                assert.ok(stateNavigator0.stateContext.crumbs[1].last);
                assert.equal(stateNavigator1.stateContext.crumbs.length, 2);
                assert.equal(stateNavigator1.stateContext.crumbs[0].state, stateNavigator1.states['s2']);
                assert.equal(stateNavigator1.stateContext.crumbs[1].state, stateNavigator1.states['s3']);
                assert.ok(!stateNavigator1.stateContext.crumbs[0].last);
                assert.ok(stateNavigator1.stateContext.crumbs[1].last);
            });
        }
    });
    
    describe('Two Controllers Back', function() {
        var stateNavigator0: StateNavigator;
        var stateNavigator1: StateNavigator;
        beforeEach(function() {
            stateNavigator0 = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
            stateNavigator1 = new StateNavigator([
                { key: 's3', route: 'r0' },
                { key: 's4', route: 'r1', trackCrumbTrail: true },
                { key: 's5', route: 'r2', trackCrumbTrail: true }
            ]);
        });
        
        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator0.navigate('s0');
                stateNavigator1.navigate('s3');
                stateNavigator0.navigate('s1');
                stateNavigator1.navigate('s4');
                stateNavigator0.navigate('s2');
                stateNavigator1.navigate('s5');
                stateNavigator0.navigateBack(1);
                stateNavigator1.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator0.getNavigationLink('s0');
                stateNavigator0.navigateLink(link);
                link = stateNavigator1.getNavigationLink('s3');
                stateNavigator1.navigateLink(link);
                link = stateNavigator0.getNavigationLink('s1');
                stateNavigator0.navigateLink(link);
                link = stateNavigator1.getNavigationLink('s4');
                stateNavigator1.navigateLink(link);
                link = stateNavigator0.getNavigationLink('s2');
                stateNavigator0.navigateLink(link);
                link = stateNavigator1.getNavigationLink('s5');
                stateNavigator1.navigateLink(link);
                link = stateNavigator0.getNavigationBackLink(1);
                stateNavigator0.navigateLink(link);
                link = stateNavigator1.getNavigationBackLink(1);
                stateNavigator1.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator0.stateContext.state, stateNavigator0.states['s1']);
                assert.equal(stateNavigator1.stateContext.state, stateNavigator1.states['s4']);
                assert.equal(stateNavigator0.stateContext.oldState, stateNavigator0.states['s2']);
                assert.equal(stateNavigator1.stateContext.oldState, stateNavigator1.states['s5']);
                assert.equal(stateNavigator0.stateContext.previousState, stateNavigator0.states['s0']);
                assert.equal(stateNavigator1.stateContext.previousState, stateNavigator1.states['s3']);
                assert.equal(stateNavigator0.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator0.stateContext.crumbs[0].state, stateNavigator0.states['s0']);
                assert.ok(stateNavigator0.stateContext.crumbs[0].last);
                assert.equal(stateNavigator1.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator1.stateContext.crumbs[0].state, stateNavigator1.states['s3']);
                assert.ok(stateNavigator1.stateContext.crumbs[0].last);
            });
        }
    });

    describe('Reload History', function () {
        it('should call stop', function() {
            var dialogs = [
                { key: 's', route: 'r' }
            ];
            var stateNavigator = new StateNavigator(dialogs);
            var stop = false;
            stateNavigator.historyManager.stop = () => stop = true;
            stateNavigator.configure(dialogs);
            assert.strictEqual(stop, true);
        });
    });

    describe('Two Controllers History Navigate', function() {
        it('should add history', function() {
            var stateNavigator0 = new StateNavigator([
                { key: 's', route: 'r0' }
            ]);
            var stateNavigator1 = new StateNavigator([
                { key: 's', route: 'r1' }
            ]);
            var url0, url1;
            stateNavigator0.historyManager.addHistory = (url) => url0 = url;
            stateNavigator1.historyManager.addHistory = (url) => url1 = url;
            stateNavigator0.navigate('s');
            stateNavigator1.navigate('s');        
            assert.strictEqual(url0, '/r0');
            assert.strictEqual(url1, '/r1');
        });
    });
    
    describe('Crumb Trail Route Param', function() {
        var stateNavigator: StateNavigator;
        var s2Link: string; 
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1/{crumb?}', trackCrumbTrail: true },
                { key: 's2', route: 'r2/{crumb?}', trackCrumbTrail: true }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                s2Link = stateNavigator.stateContext.url;
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                s2Link = stateNavigator.stateContext.url;
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should match', function() {
                assert.equal(s2Link.slice(1).split('/').length, 2);
                assert.equal(s2Link.indexOf('?'), -1);
                assert.equal(stateNavigator.stateContext.url.indexOf('?'), -1);
            })          
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
            });
        }
    });
    
    describe('Crumb Trail Route Splat Param', function() {
        var stateNavigator: StateNavigator;
        var s2Link: string; 
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1/{*crumb?}', trackCrumbTrail: true },
                { key: 's2', route: 'r2/{*crumb?}', trackCrumbTrail: true }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                s2Link = stateNavigator.stateContext.url;
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                s2Link = stateNavigator.stateContext.url;
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should match', function() {
                assert.equal(s2Link.slice(1).split('/').length, 3);
                assert.equal(s2Link.indexOf('?'), -1);
                assert.equal(stateNavigator.stateContext.url.indexOf('?'), -1);
            })          
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
            });
        }
    });
    
    describe('Crumb Trail Mixed Param', function() {
        var stateNavigator: StateNavigator;
        var s2Link: string; 
        var s3Link: string; 
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2/{*crumb?}', trackCrumbTrail: true },
                { key: 's3', route: 'r3/{crumb?}', trackCrumbTrail: true }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                s2Link = stateNavigator.stateContext.url;
                stateNavigator.navigate('s3');
                s3Link = stateNavigator.stateContext.url;
                stateNavigator.navigateBack(2);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                s2Link = stateNavigator.stateContext.url;
                link = stateNavigator.getNavigationLink('s3');
                stateNavigator.navigateLink(link);
                s3Link = stateNavigator.stateContext.url;
                link = stateNavigator.getNavigationBackLink(2);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should match', function() {
                assert.equal(s2Link.slice(1).split('/').length, 3);
                assert.equal(s3Link.slice(1).split('/').length, 2);
                assert.equal(s2Link.indexOf('?'), -1);
                assert.equal(s3Link.indexOf('?'), -1);
                assert.notEqual(stateNavigator.stateContext.url.indexOf('?'), -1);
            })          
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s3']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
            });
        }
    });
    
    describe('Crumb Trail Mandatory Route Param', function() {
        it ('should throw error', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1/{crumb}', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            assert.throws(() => stateNavigator.navigate('s2'), /is not a valid crumb/);
        });
    });
    
    describe('Crumb Trail Key', function() {
        var stateNavigator: StateNavigator;
        var s1Link: string, s2Link: string;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: 'trail' }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                s2Link = stateNavigator.stateContext.url;
                stateNavigator.navigateBack(1);
                s1Link = stateNavigator.stateContext.url;
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                s2Link = stateNavigator.stateContext.url;
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
                s1Link = stateNavigator.stateContext.url;
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should match', function() {
                assert.strictEqual(stateNavigator.states['s2'].trackCrumbTrail, true);
                assert.notEqual(s1Link.indexOf('crumb'), -1);
                assert.equal(s1Link.indexOf('trail'), -1);
                assert.equal(s2Link.indexOf('crumb'), -1);
                assert.notEqual(s2Link.indexOf('trail'), -1);
            })          
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, null);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });
    
    describe('Refresh Back', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.refresh();
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getRefreshLink();
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 1);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.ok(stateNavigator.stateContext.crumbs[0].last);
            });
        }
    });

    describe('Refresh Back Custom Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            var state = stateNavigator.states['s1'];
            state.truncateCrumbTrail = (state, data, crumbs) => crumbs.slice(0, 1);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.refresh();
                stateNavigator.navigateBack(1);
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getRefreshLink();
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationBackLink(1);
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.previousState, null);
                assert.equal(stateNavigator.stateContext.crumbs.length, 0);
            });
        }
    });

    describe('Crumb Trail Malicious', function() {
        it ('should throw error', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: '{x}' },
                { key: 's1', route: 'r/1', trackCrumbTrail: true }
            ]);
            stateNavigator.navigateLink('/r/1?crumb=%2Fwww.google.com');
            stateNavigator.navigateBack(1);
            assert.equal(stateNavigator.stateContext.data.x, 'www.google.com');
            assert.throws(() => stateNavigator.navigateLink('/r/1?crumb=www.google.com'), /Url .*is invalid/);
        });
    });
    
    describe('Crumb Trail Invalid', function() {
        it ('should throw error', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            assert.throws(() => stateNavigator.navigateLink('/r1?crumb=%2Fr2'), /The Url .*is invalid/);
        });
    });
    
    describe('Crumb Trail Encode', function() {
        it ('should populate context', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            var state = stateNavigator.states['s1'];
            state.urlEncode = (state, key, val) => {
                return encodeURIComponent(val).replace('%2F', '/');
            }
            stateNavigator.navigate('s0');
            stateNavigator.navigate('s1');
            assert.equal(stateNavigator.stateContext.url, '/r1?crumb=/r0');
            stateNavigator.navigateBack(1);
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s0']);
        });
    });
    
    describe('Repeated States With Trail', function() {
        var stateNavigator: StateNavigator;
        beforeEach(function() {
            stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true },
                { key: 's2', route: 'r2', trackCrumbTrail: true },
                { key: 's3', route: 'r3', trackCrumbTrail: true },
            ]);
        });

        describe('Navigate', function() {
            beforeEach(function() {
                stateNavigator.navigate('s0');
                stateNavigator.navigate('s1');
                stateNavigator.navigate('s2');
                stateNavigator.navigate('s3');
                stateNavigator.navigate('s1');
            });
            test();
        });
        
        describe('Navigate Link', function() {
            beforeEach(function() {
                var link = stateNavigator.getNavigationLink('s0');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s2');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s3');
                stateNavigator.navigateLink(link);
                link = stateNavigator.getNavigationLink('s1');
                stateNavigator.navigateLink(link);
            });
            test();
        });
        
        function test() {
            it('should match', function() {
                assert.equal(stateNavigator.stateContext.url.match(/crumb/g).length, 4);
            });
            it('should populate context', function() {
                assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s3']);
                assert.equal(stateNavigator.stateContext.previousState, stateNavigator.states['s3']);
                assert.equal(stateNavigator.stateContext.crumbs.length, 4);
                assert.equal(stateNavigator.stateContext.crumbs[0].state, stateNavigator.states['s0']);
                assert.equal(stateNavigator.stateContext.crumbs[1].state, stateNavigator.states['s1']);
                assert.equal(stateNavigator.stateContext.crumbs[2].state, stateNavigator.states['s2']);
                assert.equal(stateNavigator.stateContext.crumbs[3].state, stateNavigator.states['s3']);
                assert.ok(!stateNavigator.stateContext.crumbs[0].last);
                assert.ok(!stateNavigator.stateContext.crumbs[1].last);
                assert.ok(!stateNavigator.stateContext.crumbs[2].last);
                assert.ok(stateNavigator.stateContext.crumbs[3].last);
            });
        }
    });

    describe('Start Route', function () {
        it('should navigate', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: '' },
                { key: 's1', route: 'ab' }
            ]);
            stateNavigator.start('/ab');
            assert.strictEqual(stateNavigator.stateContext.state, stateNavigator.states['s1']);
        });
    });

    describe('Start Empty Route', function () {
        it('should navigate', function() {
            var stateNavigator = new StateNavigator([
                { key: 's0', route: '' },
                { key: 's1', route: 'ab' }
            ]);
            stateNavigator.start('');
            assert.strictEqual(stateNavigator.stateContext.state, stateNavigator.states['s0']);
        });
    });

    describe('HTML5 History', function () {
        it('should prepend slash', function() {
            var history = new HTML5HistoryManager();
            assert.strictEqual(history.getHref('a'), '/a');
            assert.strictEqual(history.getHref('/a'), '/a');
            history = new HTML5HistoryManager('a');
            assert.strictEqual(history.getHref('b'), '/a/b');
            assert.strictEqual(history.getHref('/b'), '/a/b');
            history = new HTML5HistoryManager('/a');
            assert.strictEqual(history.getHref('b'), '/a/b');
            assert.strictEqual(history.getHref('/b'), '/a/b');
        });
    });
});
