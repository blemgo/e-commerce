import { Box, Pagination, Typography } from '@mui/material';
import { LoadingScreen } from '@components/LoadingScreen';
import { paginatedViewStyles } from './PaginatedView.styles';

interface PaginatedViewProps {
  loading: boolean;
  isEmpty: boolean;
  emptyMessage: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  children: React.ReactNode;
}

const PaginatedView: React.FC<PaginatedViewProps> = ({
  loading,
  isEmpty,
  emptyMessage,
  page,
  totalPages,
  onPageChange,
  children,
}: PaginatedViewProps) => {
  if (loading) return <LoadingScreen />;

  if (isEmpty) {
    return <Typography sx={paginatedViewStyles.emptyState}>{emptyMessage}</Typography>;
  }

  return (
    <>
      {children}

      {totalPages > 1 && (
        <Box sx={paginatedViewStyles.paginationContainer}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => onPageChange(value)}
            color="secondary"
            shape="rounded"
          />
        </Box>
      )}
    </>
  );
};

export { PaginatedView };
