'use client';

/**
 * Dashboard Content Client Component
 * Handles the client-side rendering of the dashboard UI
 */
import { Button, cssVars } from '@tavia/taviad';
import { Styled } from './DashboardContent.styles';
import { SignOutButton } from './SignOutButton';
import { USER_ROLES, ROUTES } from '@/lib/constants';
import Image from 'next/image';

type Restaurant = {
  id: string;
  name: string;
  address: string;
  cuisine: string[];
  priceRange: string;
  isActive: boolean;
  image: string | null;
};

type DashboardContentProps = {
  user: {
    name: string | null;
    email: string | null;
    role: string;
  };
  restaurants: Restaurant[];
};

export function DashboardContent({ user, restaurants }: DashboardContentProps) {
  return (
    <Styled.Container>
      {/* Header */}
      <Styled.Header>
        <Styled.HeaderContent>
          <Styled.HeaderRow>
            <Styled.HeaderLeft>
              <Styled.Title>Dashboard</Styled.Title>
              <Styled.Subtitle>Welcome back, {user.name || user.email}</Styled.Subtitle>
            </Styled.HeaderLeft>
            <Styled.HeaderRight>
              <Styled.RoleBadge>
                {user.role === USER_ROLES.ADMIN ? 'Admin' : 'Restaurant Owner'}
              </Styled.RoleBadge>
              <SignOutButton />
            </Styled.HeaderRight>
          </Styled.HeaderRow>
        </Styled.HeaderContent>
      </Styled.Header>

      {/* Main Content */}
      <Styled.Main>
        {/* Stats Cards */}
        <Styled.StatsGrid>
          <Styled.StatCard>
            <Styled.StatCardRow>
              <Styled.StatCardLeft>
                <Styled.StatLabel>Total Restaurants</Styled.StatLabel>
                <Styled.StatValue>{restaurants.length}</Styled.StatValue>
              </Styled.StatCardLeft>
              <Styled.StatIcon $color={cssVars.mainColorLight9}>
                <svg
                  className="h-6 w-6"
                  style={{ color: cssVars.mainColor }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </Styled.StatIcon>
            </Styled.StatCardRow>
          </Styled.StatCard>

          <Styled.StatCard>
            <Styled.StatCardRow>
              <Styled.StatCardLeft>
                <Styled.StatLabel>Active Bookings</Styled.StatLabel>
                <Styled.StatValue>0</Styled.StatValue>
              </Styled.StatCardLeft>
              <Styled.StatIcon $color={cssVars.colorSuccessLight}>
                <svg
                  className="h-6 w-6"
                  style={{ color: cssVars.colorGreenDark }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </Styled.StatIcon>
            </Styled.StatCardRow>
          </Styled.StatCard>

          <Styled.StatCard>
            <Styled.StatCardRow>
              <Styled.StatCardLeft>
                <Styled.StatLabel>Total Tables</Styled.StatLabel>
                <Styled.StatValue>0</Styled.StatValue>
              </Styled.StatCardLeft>
              <Styled.StatIcon $color={cssVars.colorCyanLight}>
                <svg
                  className="h-6 w-6"
                  style={{ color: cssVars.colorCyan }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </Styled.StatIcon>
            </Styled.StatCardRow>
          </Styled.StatCard>
        </Styled.StatsGrid>

        {/* Quick Actions */}
        <Styled.QuickActionsCard>
          <Styled.QuickActionsTitle>Quick Actions</Styled.QuickActionsTitle>
          <Styled.QuickActionsGrid>
            <Styled.QuickActionLink href={ROUTES.RESTAURANT.NEW} $isPrimary>
              <Styled.QuickActionIcon>
                <Styled.QuickActionIconSvg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </Styled.QuickActionIconSvg>
              </Styled.QuickActionIcon>
              <Styled.QuickActionText>Add Restaurant</Styled.QuickActionText>
            </Styled.QuickActionLink>

            <Styled.QuickActionLink href={ROUTES.BOOKING.LIST}>
              <Styled.QuickActionIcon>
                <Styled.QuickActionIconSvg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </Styled.QuickActionIconSvg>
              </Styled.QuickActionIcon>
              <Styled.QuickActionText>View Bookings</Styled.QuickActionText>
            </Styled.QuickActionLink>

            <Styled.QuickActionLink href={ROUTES.TABLE.LIST}>
              <Styled.QuickActionIcon>
                <Styled.QuickActionIconSvg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
                  />
                </Styled.QuickActionIconSvg>
              </Styled.QuickActionIcon>
              <Styled.QuickActionText>Manage Tables</Styled.QuickActionText>
            </Styled.QuickActionLink>

            <Styled.QuickActionLink href={ROUTES.SETTINGS.HOME}>
              <Styled.QuickActionIcon>
                <Styled.QuickActionIconSvg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </Styled.QuickActionIconSvg>
              </Styled.QuickActionIcon>
              <Styled.QuickActionText>Settings</Styled.QuickActionText>
            </Styled.QuickActionLink>
          </Styled.QuickActionsGrid>
        </Styled.QuickActionsCard>

        {/* Restaurants List */}
        {restaurants.length > 0 && (
          <Styled.RestaurantsCard>
            <Styled.RestaurantsHeader>
              <Styled.RestaurantsTitle>Your Restaurants</Styled.RestaurantsTitle>
            </Styled.RestaurantsHeader>
            <Styled.RestaurantsList>
              {restaurants.map((restaurant) => (
                <Styled.RestaurantItem key={restaurant.id}>
                  <Styled.RestaurantRow>
                    <Styled.RestaurantLeft>
                      <Styled.RestaurantImage>
                        {restaurant.image ? (
                          <Image
                            src={restaurant.image}
                            alt={restaurant.name}
                            width={64}
                            height={64}
                          />
                        ) : (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        )}
                      </Styled.RestaurantImage>
                      <Styled.RestaurantInfo>
                        <Styled.RestaurantName>{restaurant.name}</Styled.RestaurantName>
                        <Styled.RestaurantAddress>{restaurant.address}</Styled.RestaurantAddress>
                        <Styled.RestaurantMeta>
                          <Styled.RestaurantMetaText>
                            {restaurant.cuisine.join(', ')}
                          </Styled.RestaurantMetaText>
                          <Styled.RestaurantMetaText>
                            {restaurant.priceRange}
                          </Styled.RestaurantMetaText>
                          <Styled.RestaurantStatus $isActive={restaurant.isActive}>
                            {restaurant.isActive ? 'Active' : 'Inactive'}
                          </Styled.RestaurantStatus>
                        </Styled.RestaurantMeta>
                      </Styled.RestaurantInfo>
                    </Styled.RestaurantLeft>
                    <Styled.RestaurantManageLink href={ROUTES.RESTAURANT.DETAIL(restaurant.id)}>
                      Manage
                    </Styled.RestaurantManageLink>
                  </Styled.RestaurantRow>
                </Styled.RestaurantItem>
              ))}
            </Styled.RestaurantsList>
          </Styled.RestaurantsCard>
        )}

        {/* Empty State */}
        {restaurants.length === 0 && (
          <Styled.EmptyState>
            <Styled.EmptyStateIcon>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </Styled.EmptyStateIcon>
            <Styled.EmptyStateTitle>No restaurants yet</Styled.EmptyStateTitle>
            <Styled.EmptyStateDescription>
              Get started by adding your first restaurant or café
            </Styled.EmptyStateDescription>
            <Button
              variant="primary"
              onClick={() => (window.location.href = ROUTES.RESTAURANT.NEW)}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ marginRight: '0.5rem' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Your First Restaurant
            </Button>
          </Styled.EmptyState>
        )}
      </Styled.Main>
    </Styled.Container>
  );
}
