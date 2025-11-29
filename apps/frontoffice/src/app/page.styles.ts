import styled from '@emotion/styled';
import { InputText, Badge, Button } from '@tavia/taviad';

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
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const RestaurantCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

export const RestaurantImage = styled.div<{ $src: string }>`
  width: 100%;
  height: 180px;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const EventBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: #00d9a3;
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const RestaurantContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const EventDate = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #ff695c;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
`;

export const RestaurantName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #1a202c;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const RestaurantHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;

export const GroupInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

export const GroupAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.65rem;
  font-weight: 600;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
`;

export const AttendeeCount = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 3rem;
  width: 100%;

  > * {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;
