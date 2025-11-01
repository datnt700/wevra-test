import styled from '@emotion/styled';
import { Card, InputText, Badge, Button } from '@tavia/taviad';

export const HeroSection = styled.section`
  background: linear-gradient(135deg, #ff695c 0%, #f14c4b 100%);
  padding: 4rem 2rem;
  text-align: center;
  color: white;
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin: 0 0 2rem 0;
  opacity: 0.95;
`;

export const SearchContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

export const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 2rem 0;
  color: #1a202c;
`;

export const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const RestaurantCard = styled(Card)`
  overflow: hidden;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

export const RestaurantImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const RestaurantContent = styled.div`
  padding: 1.5rem;
`;

export const RestaurantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.75rem;
`;

export const RestaurantName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #1a202c;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
  font-weight: 600;
`;

export const RestaurantMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const RestaurantDescription = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

export const RestaurantFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

export const LocationText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
`;

export const StyledInput = styled(InputText)`
  padding-left: 2.5rem;
`;

export const StyledBadge = styled(Badge)<{ $isOpen?: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background-color: ${({ $isOpen }) => ($isOpen ? '#dcfce7' : '#f3f4f6')};
  color: ${({ $isOpen }) => ($isOpen ? '#166534' : '#6b7280')};
  font-weight: 500;
`;

export const SmallButton = styled(Button)`
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
`;

export const CenteredMessage = styled.div`
  text-align: center;
  padding: 3rem;
`;
