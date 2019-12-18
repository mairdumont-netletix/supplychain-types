import { SupplyChainNode } from "./supply-chain-node";

/**
 * Ads.txt has been extremely successful in allowing publishers and app makers to define who is authorized to sell a given set of impressions via the programmatic marketplace.
 * Ads.txt does not however make any attempt at revealing or authorizing all parties that are part of the transacting of those impressions.
 * This information can be important to buyers for a number of reasons including transparency of the supply chain,
 * ensuring that all intermediaries are entities with which the buyer wants to transact and that inventory is purchased as directly as possible.
 * The implementation should be as transparent as possible to buyers.
 * It should enable them to easily understand who it is that is participating in the sale of any piece of inventory.
 *
 * The SupplyChain object is composed primarily of a set of nodes where each node represents a specific entity that participates in the transacting of inventory.
 * The entire chain of nodes from beginning to end represents all entities who are involved in the direct flow of payment for inventory.
 * Future versions of the specification may also include entities who are involved in the transaction but are not involved in payment.
 */
export interface SupplyChain {

  /**
   * Version of the supply chain specification in use, in the format of "major.minor".
   * For example, for version 1.0 of the spec, use the string "1.0".
   */

  ver: '1.0' | string;

  /**
   * Flag indicating whether the chain contains all nodes involved in the transaction leading back to
   * the owner of the site, app or other medium of the inventory, where 0 = no, 1 = yes.
   */

  complete: 0 | 1;

  /**
   * Array of SupplyChainNode objects in the order of the chain.
   * In a complete supply chain, the first node represents the initial advertising system and
   * seller ID involved in the transaction, i.e. the owner of the site, app, or other medium.
   * In an incomplete supply chain, it represents the first known node.
   * The last node represents the entity sending this bid request.
   */
  nodes: SupplyChainNode[];
}
