import { StyleSheet } from "react-native";
import color from "../../theme/colors";
import { moderateScale } from "../../utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerContainer: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
  },
  subHeader: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderLeftWidth: 4,
  },
  positiveCard: {
    borderLeftColor: '#16c784',
  },
  negativeCard: {
    borderLeftColor: '#ea3943',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  symbolContainer: {
    flex: 1,
  },
  symbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  volume: {
    fontSize: 12,
    color: '#64748b',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  change24hBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  positiveBadge: {
    backgroundColor: 'rgba(22, 199, 132, 0.1)',
  },
  negativeBadge: {
    backgroundColor: 'rgba(234, 57, 67, 0.1)',
  },
  change24hText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  priceChangeContainer: {
    flex: 1,
  },
  priceChangeLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  priceChangeValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#334155',
  },
  timestamp: {
    fontSize: 11,
    color: '#94a3b8',
  },
  statusBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    alignItems: 'center',
  },
  connectedStatus: {
    backgroundColor: '#16c78410',
  },
  connectingStatus: {
    backgroundColor: '#f59e0b10',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
});