/**
 * The entire chain of nodes from beginning to end represents all entities who are involved in the direct flow of payment for inventory.
 *
 * A node contains two required properties; the advertising system identifier (asi) and the seller ID (sid).
 * The advertising system identifier is the domain name of the advertising system.
 * The seller ID is used to identify the seller of the inventory; who the advertising system pays for this inventory.
 * Both the advertising system identifier and the seller ID should be the same values that are provided in ads.txt files.
 * It is invalid for a Seller ID to represent multiple entities.
 * Every Seller ID must map to only a single entity that is paid for inventory transacted with that Seller ID.
 * It is valid for a selling entity to have multiple Seller IDs within an advertising system.
 */
export interface SupplyChainNode {

  /**
   * The canonical domain name of the SSP, Exchange, Header Wrapper, etc system that bidders connect to.
   * This may be the operational domain of the system, if that is different than the parent corporate domain,
   * to facilitate WHOIS and reverse IP lookups to establish clear ownership of the delegate system.
   * This should be the same value as used to identify sellers in an ads.txt file if one exists.
   */
  asi: string;

  /**
   * The identifier associated with the seller or reseller account within the advertising system.
   * This must contain the same value used in transactions (i.e. OpenRTB bid requests) in the
   * field specified by the SSP/exchange. Typically, in OpenRTB, this is publisher.id.
   * For OpenDirect it is typically the publisher’s organization ID.
   * Should be limited to 64 characters in length.
   */
  sid: string;

  /**
   * The OpenRTB RequestId of the request as issued by this seller.
   */
  rid?: string;

  /**
   * The name of the company (the legal entity) that is paid for inventory transacted under the given seller_id.
   * This value is optional and should NOT be included if it exists in the advertising system’s sellers.json file.
   */
  name?: string;

  /**
   * The business domain name of the entity represented by this node.
   * This value is optional and should NOT be included if it exists in the advertising system’s sellers.json file.
   */
  domain?: string;

  /**
   * Indicates whether this node will be involved in the flow of payment for the inventory.
   * When set to 1, the advertising system in the asi field pays the seller in the sid field,
   * who is responsible for paying the previous node in the chain.
   * When set to 0, this node is not involved in the flow of payment for the inventory.
   * For version 1.0 of SupplyChain, this property should always be 1.
   * It is explicitly required to be included as it is expected that future versions of
   * the specification will introduce non-payment handling nodes.
   * Implementers should ensure that they support this field and propagate it onwards when
   * constructing SupplyChain objects in bid requests sent to a downstream advertising system.
   */
  hp: 0 | 1;
}
